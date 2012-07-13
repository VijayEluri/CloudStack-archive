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
cloudStack.autoScale = {

     autoScaleCondition:function(args) {
          var multiEditData=[];
          var totalIndex =0;
          var context = args.context; 
          return $('<div>').multiEdit({
               context:context,
               noSelect:true,
            
               multipleAdd: true,
               fields:{
                   'Counter':{edit: true,label: 'label.counter'},
                   'Operator': {edit:true,label: 'label.operator'},
                   'Threshold':{edit:true,label: 'label.threshold'},
                   'add-policy':{label:'label.add' ,addButton:true}

                 },

            add: {
            label: 'label.add',
            action: function(args) {
              multiEditData.push($.extend(args.data, {
                index: totalIndex
              }));

              totalIndex++;
              args.response.success();
            }
          },
          actions: {
            destroy: {
              label: 'label.remove.rule',
              action: function(args) {
                multiEditData = $.grep(multiEditData, function(item) {
                  return item.index != args.context.multiRule[0].index;
                });
                args.response.success();
              }
            }
          },
          dataProvider: function(args) {
            args.response.success({
              data: multiEditData
            });
          }
        });
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
