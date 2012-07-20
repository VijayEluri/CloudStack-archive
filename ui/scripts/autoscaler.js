// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Automatically generated by addcopyright.py at 04/03/2012
(function($,cloudstack) {
  cloudStack.autoscaler = {
    // --
    // Add the following object blocks:
    //
    // topFields: { <standard createForm field format> }
    // bottomFields: { <standard createForm field format> },
    // scaleUpPolicy: { <standard multiEdit field format> },
    // scaleDownPolicy: { <standard multiEdit field format> }
    // --
    //
    forms: {
      topFields: {
        templateCategory: {
          label: 'Template',
          id: 'templatecategory',
          select: function(args) {
            args.response.success({
              data: [
                { category: 'all', description: _l('ui.listView.filters.all') },
                { category: 'featured', description: _l('label.featured') },
                { category: 'Community', description: _l('label.menu.community.templates') },
                { category: 'self', description: _l('ui.listView.filters.mine') }
              ]
            });
          }
        },

        templateNames: {
          label: '',
          id: 'templatename',
          select: function(args) {
            $.ajax({
              url: createURL("listTemplates&templatefilter=all" ),
              dataType: "json",
              async: true,
              success: function(json) {
                var templates = json.listtemplatesresponse.template;
                args.response.success({
                  data: $.map(templates, function(template) {
                    return {
                      id: template.id,
                      description: template.name
                    };
                  })
                });
              }
            });
          }
        },

        serviceOfferingId: {
          label: 'label.compute.offering',
          select: function(args) {
            $.ajax({
              url: createURL("listServiceOfferings&issystem=false"),
              dataType: "json",
              async: true,
              success: function(json) {
                var serviceofferings = json.listserviceofferingsresponse.serviceoffering;
                args.response.success({
                  data: $.map(serviceofferings, function(serviceoffering) {
                    return {
                      id: serviceoffering.id,
                      description: serviceoffering.name
                    };
                  })
                });
              }
            });
          }
        },

        minInstance: {
          label: 'Min Instances',
          defaultValue: '3',
          validation: { required: true }
        },

        maxInstance: {
          label: 'Max Instances',
          defaultValue: '10',
          validation: { required: true }
        }
      },

      bottomFields: {
    	  isAdvanced: { isBoolean: true, label: 'Show advanced settings' },
          interval: {
              label: 'Polling Interval (in sec)',
              defaultValue: '30',
              validation: { required: true }
          },

          quietTime: {
          	label: 'Quiet Time (in sec)',
          	defaultValue: '300',
          	validation: { required: true }
          },

          destroyVMgracePeriod: {
          	label: 'Destroy VM Grace Period',
          	defaultValue: '30',
              isHidden:true,
              dependsOn:'isAdvanced',
          	validation: { required: true }
          },
        securityGroups: {
          label: 'label.menu.security.groups',
          isHidden: true,
          dependsOn: 'isAdvanced',
          select: function(args) {
            $.ajax({
              url: createURL("listSecurityGroups&listAll=true"),
              dataType: "json",
              async: true,
              success: function(json) {
                var securitygroups = json.listsecuritygroupsresponse.securitygroup;
                args.response.success({
                  data: $.map(securitygroups, function(securitygroup) {
                    return {
                      id: securitygroup.id,
                      description: securitygroup.name
                    };
                  })
                });
              }
            });
          }
        },

        DiskOfferings: {
          label: 'label.menu.disk.offerings',
          isHidden: true,
          dependsOn: 'isAdvanced',
          select: function(args) {
            $.ajax({
              url: createURL("listDiskOfferings&listAll=true"),
              dataType: "json",
              async: true,
              success: function(json) {
                var diskofferings = json.listdiskofferingsresponse.diskoffering;
                args.response.success({
                  data: $.map(diskofferings, function(diskoffering) {
                    return {
                      id: diskoffering.id,
                      description: diskoffering.name
                    };
                  })
                });
              }
            });
          }
        },

        snmpCommunity: {
        	isHidden: true,
            dependsOn: 'isAdvanced',
          label: 'SNMP Community',
          defaultValue: 'public',
          validation: { required: true }
        },

        snmpPort: {
        	isHidden: true,
            dependsOn: 'isAdvanced',
          label: 'SNMP Port',
          defaultValue: '161',
          validation: { required: true }
        },

        username: {
        	isHidden: true,
            dependsOn: 'isAdvanced',
          label: 'Username',
          select: function(args) {
            $.ajax({
              url: createURL("listUsers&domainid=" + args.context.users[0].domainid),
              dataType: "json",
              async: true,
              success: function(json) {
            	var users = json.listusersresponse.user;
            	args.response.success({
            		data:  $.map(users, function(user) {
            			return {
            				id: user.id,
            				description: user.username
            			};
            		})
            	});
              }
            });
          }
        },
      },
      scaleUpPolicy: {
        title: 'ScaleUp Policy',
        label: 'SCALE UP POLICY',
        noSelect: true,
        noHeaderActionsColumn: true,
        fields: {
          'counterid': { 
    	    label: 'Counter',
    	      select: function(args) {
                $.ajax({
                  url: createURL("listCounters"),
                  dataType: "json",
                  async: true,
                  success: function(json) {
                    var counters = json.counterresponse.counter;
                    args.response.success({
                        data: $.map(counters, function(counter) {
                        return {
                        name: counter.id,
                        description: counter.name
                      };
                      })
                    });
                  }
                });
            }
	
	      },
          'relationaloperator': {
            label: 'Operator',
            select: function(args) {
              args.response.success({
                data: [
                  { name: 'GT', description: 'greater-than' },
                  { name: 'GE', description: 'greater-than or equals to' },
                  { name: 'LT', description: 'less-than' },
                  { name: 'LE', description: 'less-than or equals to' },
                  { name: 'EQ', description: 'equals-to' }
                ]
              });
            }
          },
          'threshold': { edit: true, label: 'Threshold'},
          'add-scaleUpcondition': {
            label: 'label.add',
            addButton: true
          }
        },
        
        add: {
          label: 'label.add',
          action: function(args) {
        	var array1 = [];
            array1.push("&counterid=" + args.data.counterid);
            array1.push("&relationaloperator=" + args.data.relationaloperator);
            array1.push("&threshold=" + todb(args.data.threshold));
            array1.push("&account=" + args.context.users[0].account);
            array1.push("&domainid=" +args.context.users[0].domainid );
            
            $.ajax({
            	url: createURL("createCondition" + array1.join("")),
		                dataType: 'json',
		                async: true,
		                success: function(data) {
		                  var jobId = data.conditionresponse.jobid;
		
		                  args.response.success({
		                    _custom: {
		                      jobId: jobId
		                    }
		                  });
		                }
            });
          }
        },
        
        actions: {
          destroy: {
        	label: '',
            action: function(args) {
              $.ajax({
                url: createURL("deleteCondition&id=" + args.context.multiRule[0].id),
                        dataType: 'json',
                        async: true,
                        success: function(data) {
                          var jobId = data.deleteconditionresponse.jobid;

                          args.response.success({
                            _custom: {
                              jobId: jobId
                            }
                          });
                        }
            	});
            }
          }
        },
        ignoreEmptyFields: true,
        dataProvider: function(args) {
        	$.ajax({
                url: createURL('listConditions'),
                dataType: 'json',
                async: true,
                success: function(data) {
	        		args.response.success({
	                              data: $.map(
	                                data.listconditionsresponse.condition ?
	                                  data.listconditionsresponse.condition : [],
	                                function(elem) {
	                                  return {
	                                	counterid: elem.id,
	                                    relationaloperator: elem.relationaloperator,
	                                    threshold: elem.threshold
	                                  };
	                                }
	                              )
	                            });
                }
        	});
        }
      },

      scaleDownPolicy: {
        title: 'ScaleDown Policy',
        noSelect: true,
        noHeaderActionsColumn: true,
        fields: {
          'counterid': {
    	  label: 'Counter',
            select: function(args) {
	            $.ajax({
	              url: createURL("listCounters"),
	              dataType: "json",
	              async: true,
	              success: function(json) {
	                var counters = json.counterresponse.counter;
	                args.response.success({
	                    data: $.map(counters, function(counter) {
	                    return {
	                    name: counter.id,
	                    description: counter.name
	                  };
	                  })
	                });
	              }
	            });
      		}
      	  },
          'relationaloperator': {
            label: 'Operator',
            select: function(args) {
              args.response.success({
                data: [
                  { name: 'GT', description: 'greater-than' },
                  { name: 'GE', description: 'greater-than or equals to' },
                  { name: 'LT', description: 'less-than' },
                  { name: 'LE', description: 'less-than or equals to' },
                  { name: 'EQ', description: 'equals-to' }
                ]
              });
            }
          },
          'threshold': { edit: true, label: 'Threshold'},
          'add-scaleDowncondition': {
            label: 'label.add',
            addButton: true
          }
        },
        add: {
          label: 'label.add',
          action: function(args) {
          	var array1 = [];
              array1.push("&counterid=" + args.data.counterid);
              array1.push("&relationaloperator=" + args.data.relationaloperator);
              array1.push("&threshold=" + todb(args.data.threshold));
              array1.push("&account=" + args.context.users[0].account);
              array1.push("&domainid=" +args.context.users[0].domainid );
              
              $.ajax({
              	url: createURL("createCondition" + array1.join("")),
  		                dataType: 'json',
  		                async: true,
  		                success: function(data) {
  		                  var jobId = data.conditionresponse.jobid;
  		
  		                  args.response.success({
  		                    _custom: {
  		                      jobId: jobId
  		                    }
  		                  });
  		                }
              });
            }
        },
        actions: {
          destroy: {
            label: '',
            action: function(args) {
        	$.ajax({
                url: createURL("deleteCondition&id=" + args.context.multiRule[0].id),
                        dataType: 'json',
                        async: true,
                        success: function(data) {
                          var jobId = data.deleteconditionresponse.jobid;

                          args.response.success({
                            _custom: {
                              jobId: jobId
                            }
                          });
                        }
            	});
            }
          }
        },
        ignoreEmptyFields: true,
        dataProvider: function(args) {
        	$.ajax({
                url: createURL('listConditions'),
                dataType: 'json',
                async: true,
                success: function(data) {
	        		args.response.success({
	                              data: $.map(
	                                data.listconditionsresponse.condition ?
	                                  data.listconditionsresponse.condition : [],
	                                function(elem) {
	                                  return {
	                                	counterid: elem.id,
	                                    relationaloperator: elem.relationaloperator,
	                                    threshold: elem.threshold
	                                  };
	                                }
	                              )
	                            });
                }
        	});
        }
      }
    },


    dialog: function(args) {
      return function(args) {
        var context = args.context;

        var $dialog= $('<div>');
        $dialog.dialog ({
          title: 'AutoScale Configuration Wizard',
          closeonEscape: false,

          draggable:true,
          width:  825 ,
          height :600,
          buttons: {
            'Cancel': function() {
              $(this).dialog("close");
              $('.overlay').remove();
            },


            'Apply': function() {
              $(':ui-dialog').remove();
              $('.overlay').remove();
            }
          }
        }).closest('.ui-dialog').overlay();

        $("buttons").each(function() {
          $(this).attr('style','float: right');
        });
        var $field = $('<div>').addClass('field username');
        var $input = $('<input>').attr({ name: 'username' });
        var $inputLabel = $('<label>').html('Username');

        $field.append($input, $inputLabel);
        $field.appendTo($dialog);


      }
    }
  }
} (jQuery,cloudStack));
