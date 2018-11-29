module.exports={
	gmail_filter:'from:(donotreply.sbiatm@sbi.co.in) subject:(Transaction alert for your State Bank of India Debit Card)',
	active:true,
	required_fields:['account_last_4_digits','currency','amount','whom_you_paid','available_credit_balance','date','time'],
	body_parsers:[
		{
			version:'atm_v1',
			description:'as of sept 2018',
			fields:[
				{
					name:'account_last_4_digits',
					type:'integer',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' fm A/cx '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'currency',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' '
						},
						{
							type:'trim',
						},
						{
							type:'replace',
							options:{
								replace:'Rs',
								with:'INR',
							}
						},
					]
				},
				{
					name:'amount',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Rs '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' w/d at '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'whom_you_paid',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' at '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' fm A/cx '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'transaction_id',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Txn#'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'balance_currency',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:' '
						},
						{
							type:'trim',
						},
						{
							type:'replace',
							options:{
								replace:'Rs',
								with:'INR',
							}
						},
					]
				},
				{
					name:'balance_amount',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' '
						},
						{
							type:'trim',
						},
					]
				},
			]
		},
		{
			version:'atm_v2',
			description:'as of sept 2018',
			fields:[
				{
					name:'account_last_4_digits',
					type:'integer',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' withdrawn from A/c xx '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'currency',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' '
						},
						{
							type:'trim',
						},
						{
							type:'replace',
							options:{
								replace:'Rs',
								with:'INR',
							}
						},
					]
				},
				{
					name:'amount',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Rs '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' withdrawn from A/c xx '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'whom_you_paid',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' at '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'.Txn# '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'transaction_id',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Txn#'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'balance_currency',
					type:'string',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:' '
						},
						{
							type:'trim',
						},
						{
							type:'replace',
							options:{
								replace:'Rs',
								with:'INR',
							}
						},
					]
				},
				{
					name:'balance_amount',
					type:'float',
					filters:[
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'.Avl bal '
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' '
						},
						{
							type:'trim',
						},
					]
				},
			]
		},
		{
			version:'debit_card_v1',
			description:'as of sept 2018',
			fields:[
				{
					name:'debit_card_last_4_digits',
					type:'integer',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Thank you for using your SBI Debit Card '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'XX'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' for a purchase worth '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'currency',
					type:'string',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Thank you for using your SBI Debit Card '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'for a purchase worth '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
						},
						{
							type:'trim',
						},
						{
							type:'substring',
							options:{
								start:0,
								end:2
							}
						},
						{
							type:'replace',
							options:{
								replace:'Rs',
								with:'INR',
							}
						},
					]
				},
				{
					name:'amount',
					type:'float',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Thank you for using your SBI Debit Card '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'for a purchase worth '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
						},
						{
							type:'trim',
						},
						{
							type:'substring',
							options:{
								start:2
							}
						},
					]
				},
				{
					name:'whom_you_paid',
					type:'string',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Thank you for using your SBI Debit Card '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' at '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' txn# '
						},
						{
							type:'trim',
						},
					]
				},
				{
					name:'transaction_id',
					type:'float',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:'Thank you for using your SBI Debit Card '
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							q:'.If not done by you'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							q:' txn# '
						},
						{
							type:'trim',
						},
					]
				},
			]
		},
		
		

	]
	
}