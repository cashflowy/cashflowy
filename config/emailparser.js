var moment = require('moment-timezone');
module.exports.emailparser = {
    // apply global first, then override with individual filter modifiers
    beforeModifyData: function (pe) {
        pe.data = _.cloneDeep(pe.extracted_data);
        if (!pe.extracted_data.currency)
            pe.data.currency = 'INR';
        // default is expense, so negative, if specific filter is a credit then explicitly mark as income
        pe.data.original_amount = -(pe.extracted_data.amount);
        pe.data.type = 'income_expense';
        pe.data.third_party = pe.extracted_data.whom_you_paid ? pe.extracted_data.whom_you_paid : pe.extracted_data.third_party;

        // date priority
        if (pe.data.date && pe.data.time) {
            pe.data.occuredAt = new Date(pe.data.date + ' ' + pe.data.time + '+5:30');
        }
        if (!_.isDate(pe.data.occuredAt)) {

            if (pe.data.forward_orignal_date) {
                var forward_orignal_date=pe.data.forward_orignal_date.substring(5)
                pe.data.occuredAt = moment(forward_orignal_date, 'MMM D, YYYY at hh:mm A').tz('Asia/Kolkata').toDate()
            }
        } else {
            pe.data.occuredAt = pe.data.email_received_time;
        }
        if (!_.isDate(pe.data.occuredAt)){
            pe.data.occuredAt = pe.data.email_received_time;
        }

        //default acc_number
        if (pe.data.credit_card_last_4_digits)
            pe.data.acc_number = pe.data.credit_card_last_4_digits;
        else if (pe.data.account_last_4_digits)
            pe.data.acc_number = pe.data.account_last_4_digits;
        return pe
    },
    afterModifyData: function (pe) {
        const fx = require('money');
        fx.base = 'INR';
        fx.rates = sails.config.fx_rates;
        try{
            pe.data.amount_inr = fx.convert(pe.data.original_amount, { from: pe.data.currency, to: "INR" });
        }catch(err){
            sails.config.sentry.withScope(scope => {
				scope.setTag('original_amount', pe.data.original_amount);
				scope.setTag('currency', pe.data.currency);
				sails.config.sentry.captureException(err);
			});
            pe.data.amount_inr = pe.data.original_amount;
        }
        return pe
    },
    filters: [
        {
            name: 'NiyoCardFilter',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'money_added_v1') {
                    pe.data.original_amount = pe.extracted_data.amount;
                }
                return pe;
            }
            
        },
        {
            name: 'AmericanBankOfCommerce',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'incoming_v1') {
                    pe.data.original_amount = pe.extracted_data.amount;
                }
                return pe;
            }
            
        },
        {
            name: 'FirstCapitalBankOfTexas',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'incoming_v1') {
                    pe.data.original_amount = pe.extracted_data.amount;
                }
                return pe;
            }
            
        },
        {
            name: 'PaytmFilter',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'received_money_v1'||pe.body_parser_used == 'money_added_v1'||pe.body_parser_used == 'received_cashback_v1'||pe.body_parser_used == 'money_added_automatically_v1'||pe.body_parser_used == 'received_refund_v1') {
                   if(pe.extracted_data.from_phone)
                        pe.data.third_party = pe.extracted_data.from_phone + '(' + pe.extracted_data.from_name + ')';
                    pe.data.acc_number = pe.extracted_data.to;
                    pe.data.original_amount = pe.extracted_data.amount;
                } 
                else {
                    pe.data.acc_number = pe.extracted_data.from_phone;
                    if (pe.extracted_data.to_phone)
                        pe.data.third_party = pe.extracted_data.to_phone + '(' + pe.extracted_data.to_name + ')';
                    else if (pe.extracted_data.to_name)
                        pe.data.third_party = pe.extracted_data.to_name;
                }
                // use last 4 digit incase of paid via payment gateway.
                if (pe.body_parser_used == 'you_paid_pg_v1') {
                    pe.data.acc_number = pe.data.from_phone.substr(pe.data.from_phone.length - 4)
                }

                return pe;
            }
        },
        {
            name: 'IciciCreditCardTransactionAlertFilter',
           
        },
        { 
            name:'IciciCreditCardPaymentReceivedFilter',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'received_money_v1'||'received_money_via_upi_v1') {
                    pe.data.original_amount = pe.extracted_data.amount;
                }

                return pe;
            }


        },
        {
            name: 'IciciInternetBankingFilter',
        },
        {
            name: 'IciciMobileBankingFilter',
        },
        {
            name: 'IciciDebitCardFilter',
        },
        {
            name: 'IciciCreditCardRefundFilter',
            modifyData: function (pe) {
                pe.data.original_amount = pe.data.amount;
                return pe;
            }
        },
        {
            name: 'HdfcUpiFilter',
        },
        {
            name: 'HdfcNetBankingFilter',
        },
        {
            name: 'CitibankCreditCardTransactionFilter',
        },
        {
            name: 'CitibankUpiFilter',
        },
        {
            name: 'CitibankBalanceUpdate',
            modifyData: function (pe) {
                pe.data.type = 'balance';
                return pe
            }
        },
        {
            name: 'AmazonPayTransactionFilter',
            modifyData: function (pe) {
                pe.data.acc_number = pe.email + '-amazon_pay';
                return pe;
            }
        },
        {
            name: 'AmazonPayCashbackFilter',
            modifyData: function (pe) {
                pe.data.acc_number = pe.email + '-amazon_pay';
                pe.data.original_amount = pe.extracted_data.amount;

                return pe;
            }
        },
        {
            name: 'AmazonPayRefundFilter',
            modifyData: function (pe) {
                pe.data.acc_number = pe.email + '-amazon_pay';
                pe.data.original_amount = pe.extracted_data.amount;
                //date format '25 Jul 2019' 
                // if date extracted from the email is same as the recieved_time the use the recieved time as it contians both date and time info. 
                //Else use the  extracted date.

                // date priority
                if (pe.data.date) {
                    if (moment(pe.data.date, 'D MMM YYYY').isSame(new Date(), 'day')) {
                        pe.data.occuredAt = pe.data.email_received_time;
                    } else {
                        pe.data.occuredAt = moment(pe.data.date, 'D MMM YYYY').tz('Asia/Kolkata').toDate();
                    }
                }
                if (pe.data.forward_orignal_date) {
                    pe.data.occuredAt = moment(pe.data.forward_orignal_date, 'ddd, MMM D, YYYY at hh:mm A').tz('Asia/Kolkata').toDate()
                } else if (pe.data.occuredAt == 'Invalid Date') {
                    pe.data.occuredAt = pe.data.email_received_time;
                } else {
                    pe.data.occuredAt = pe.data.email_received_time;
                }
                return pe;
            }
        },
        {
            name: 'AmazonPayExternalFilter',
            modifyData: function (pe) {
                pe.data.acc_number = pe.email + '-amazon_pay';
                return pe
            }
        },
        {
            name: 'HdfcBankBalanceFilter',
            modifyData: function (pe) {
                pe.data.type = 'balance';
                return pe
            }
        },
        {
            name: 'ZerodhaTransferFilter',
            modifyData: function (pe) {
                pe.data.acc_number = pe.email + '-zerodha';
                pe.data.type = 'transfer'
                return pe
            }
        },
        {
            name: 'HdfcBankAccountCreditFilter',
            modifyData: function (pe) {
                pe.data.original_amount = pe.extracted_data.amount;
            }
        },
        {
            name: 'YesBankCreditCardTransactionFilter'
        },
        {
            name: 'SBIDebitCardFilter'
        },
        {
            name: 'SBIOnlineTransactionFilter'
        },
        {
            name: 'SBIToSBIFilter'
        },
        {
            name: 'SBIRtgsFilter',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'credit_v1')
                    pe.data.original_amount = pe.extracted_data.amount;
                return pe.data
            }
        },
        {
            name: 'SBINeftFilter',
            modifyData: function (pe) {
                if (pe.body_parser_used == 'credit_v1')
                    pe.data.original_amount = pe.extracted_data.amount;
                return pe
            }
        },
       
    ]

}