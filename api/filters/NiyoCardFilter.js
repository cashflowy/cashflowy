module.exports={

	active:true,
	required_fields:['credit_card_last_4_digits','currency','amount','whom_you_paid','available_credit_balance','date','time'],
	body_parsers:[
		{
			version:'v1',
			description:'as of oct 2019',
			fields:[
				{
					name:'account_last_4_digits',
					type:'integer',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'XXXXXX'
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
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
                        },
                        {
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'trim',
						},
					
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:','
                        },
                        
						
                        {
							type:'replace',
							options:{
								replace:'₹',
								with:'INR',
							}
                        },
                        {
							type:'substring',
							options:{
								start:1,
								end:4,
							}
                        },
                        
						{
							type:'trim',
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
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
                        },
                        {
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'trim',
						},
					
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:','
                        },
                        
						
                        {
							type:'replace',
							options:{
								replace:'₹',
								with:'INR',
							}
                        },
                        {
							type:'substring',
							options:{
								start:4,
							}
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
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' at '
                        },
                        {
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'.'
						},
						
						{
							type:'trim',
						},
					]
				},
				{
					name:'date',
					type:'string',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
                        },
                        {
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' at '
                        },
                        {
							type:'replace',
							options:{
								replace:'*',
								with:'',
							}
						},
                        
						{
							type:'trim',
                        },
                        {
							type:'substring',
							options:{
								start:0,
								end:16,
							}
                        },
                        {
							type:'trim',
                        },
					]
				},
				{
					name:'time',
					type:'string',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Dear'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Thank you for shopping with NiYO!'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Transaction Successful'
						},
						{
							type:'trim',
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'was spent on your NiYO Card'
						},
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' on '
                        },
                        {
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' at '
                        },
                        {
							type:'replace',
							options:{
								replace:'*',
								with:'',
							}
						},
						{
							type:'trim',
                        },
                        {
							type:'substring',
							options:{
								start:18,
							}
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
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Remaining total balance is'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Account Balance Summary is'
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
							type:'replace',
							options:{
								replace:'₹',
								with:'INR',
							}
						},
                        {
							type:'trim',
                        },
					]
				},
				{
					name:'balance_amount',
					type:'float',
					filters:[
						{
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Remaining total balance is'
						},
						{
							type:'find_end_position',
							criteria:'text_match_before',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:'Account Balance Summary is'
						},
						{
							type:'trim',
						},
						
                        {
							type:'find_start_position',
							criteria:'text_match_after',
							options:{
								case_sensitive:false,
								beginning_of_line:true
							},
							q:' '
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