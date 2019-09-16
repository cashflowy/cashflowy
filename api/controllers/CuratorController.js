/**
 * UserController
 *
 * this is a blueprint controller
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * 
 */
var async = require('async');
module.exports = {
	filterTest: function (req, res) {
		var locals = {
			filters: sails.config.emailparser.filters,
			filter: undefined,
			mailgun_webhook_body: undefined,
			email_id: undefined,
			extracted_data: undefined,
			body_parser_used: undefined,
			error: undefined,
			status: undefined
		}
		if (req.body) {
			locals.mailgun_webhook_body = JSON.parse(req.body.mailgun_webhook_body);
			locals.email_id = MailgunService.findEmailIdFromWebhook(locals.mailgun_webhook_body);
			locals.filter = req.body.filter;
			async.auto({
				extractDataFromMessageBody: function (cb) {
					var opts = {
						email_type: locals.filter,
						body: locals.mailgun_webhook_body['body-plain'].replace(/[\r\n]+/g, " ")
					}
					EmailParserService.extractDataFromMessageBody(opts, cb);
				},
				exctractDatetimeforManualForward: function (cb) {
					var opts = {
						email_type: locals.filter,
						body: locals.mailgun_webhook_body['body-plain'].replace(/[\r\n]+/g, " ")
					}
					EmailParserService.extractDataFromMessageBody(opts, cb);
				}
			}, function (err, results) {
				if (err) {
					locals.status = 'error';
					locals.error = err.message;
				} else {
					locals.extracted_data =  results.extractDataFromMessageBody.ed;
					locals.body_parser_used = results.extractDataFromMessageBody.body_parser_used,
					locals.extracted_data.email_received_time = new Date(locals.mailgun_webhook_body['Date']);
					if (results.exctractDatetimeforManualForward && results.exctractDatetimeforManualForward.body_parser_used) {
						locals.extracted_data.forward_orignal_date = _.get(results, 'exctractDatetimeforManualForward.ed.datetime')
					}
				}
			})
		}
		res.view('curator/filter_test', locals);
	},
	listAllParseFailures:function(req,res){
		var limit = req.query.limit?parseInt(req.query.limit): 25;
		var page = req.query.page?parseInt(req.query.page):1;
		var skip = limit * (page-1);
		async.auto({
			getParseFailures:function(callback){
				Parse_failure.find()
					.sort('createdAt DESC')
					.limit(limit)
					.skip(skip)
					.exec(callback);
			},
		},function(err,results){
			var locals={
				parse_failures:results.getParseFailures,
				page: page,
				limit:limit,
			}
			res.view('curator/list_all_parse_failures',locals);
		})
	},
	resolveParseFailureManually:function(callback){
		if(req.body){
			//mark pf as resolved_manually
			Parse_failure.update({id:req.params.pf_id}).set({status:'RESOLVED_MANUALLY'}).exec(function(err,pf){
				if(err)
					throw err
				res.redirect(`curator/list_all_parse_failures`)
			})
		}else{
			res.view('curator/resolve_parse_failures')
		}
	},
	
};
