module ngApp.search.models {
    import TableiciousConfig = ngApp.components.tables.directives.tableicious.TableiciousConfig;
    import TableiciousEntryDefinition = ngApp.components.tables.directives.tableicious.TableiciousEntryDefinition;

    var searchTableFilesModel:TableiciousConfig = {
        title: 'Files',
        order: ['add_to_cart','data_access', 'file_name', 'file_type', 'participants', 'project_name', 'availableData', 'status', 'last_update'],
        headings: [{
            displayName: "add_to_cart",
            id: "add_to_cart",
            enabled: true
        }, {
            displayName: "Access",
            id: "data_access",
            enabled: true,
            icon:function(field){
                return field && field.val === 'protected' ? "lock" : "unlock";
            },
            template:function(){
                return '';
            }
        }, {
            displayName: "File Name",
            id: "file_name",
            enabled: true,
            template:function(field,row,scope){
                return field && field.val && scope.$filter('ellipsicate')(field.val,50);
            },
            sref:function(field,row){
                var uuid = _.find(row,function(a:TableiciousEntryDefinition){return a.id === 'file_uuid'});
                return "file({ fileId: '"+uuid.val+"' })";
            }
        }, {
            displayName: "File Type",
            id: "data_format",
            enabled: true,
        },
        {
            displayName: "Participants",
            id: "participants",
            enabled: true,
            template: function (field,row,scope) {
                var participants = field.val;
                if (participants) {
                    if (participants.length === 1) {
                       return  scope.$filter('ellipsicate')(participants[0].bcr_patient_uuid, 8);
                    } else if (participants.length > 1) {
                        return participants.length;
                    }
                }
            },
            sref: function (field) {
                var participant = field.val;
                if (participant) {
                    return "participant({ participantId : '" + participant[0].bcr_patient_uuid + "' })";
                }
            }
        }, {
            displayName: "Annotations",
            id: "annotations",
            enabled: true
        }, {
            displayName: "Project",
            id: "disease_code",
            enabled: true,
            template:function(field:TableiciousEntryDefinition,row:TableiciousEntryDefinition[],scope){
                var arch:TableiciousEntryDefinition = _.find(row,function(a:TableiciousEntryDefinition){return a.id === 'archive'});
                var code:any = arch.val.disease_code;
                return code;
            },
            sref:function (field:TableiciousEntryDefinition,row:TableiciousEntryDefinition[],scope) {

                var arch:TableiciousEntryDefinition = _.find(row,function(a:TableiciousEntryDefinition){return a.id === 'archive'});
                var code:any = arch.val.disease_code;

                return "project({ 'projectId':'" + code + "'})";

            }
        }, {
            displayName: "Data Category",
            id: "status",
            enabled: true,
            template: function (field) {
                return field && field.val || 'miRNA expression';
            }
        }, {
            displayName: "Status",
            id: "last_update",
            enabled: true,
            template: function (field) {
                return field && field.val || 'tbc';
            }
        }, {
            displayName: "Size",
            id: "file_size",
            enabled: true,
            template:function(field,row,scope){
                //debugger;
                return scope.$filter('size')(field.val);
            }
        },{
            displayName: "Revision",
            id: "revision",
            enabled: true
        },{
            displayName: "Update date",
            id: "updated",
            enabled: true,
            template:function(field,row,scope){
                return scope.$filter('date')(field.val);
            }
        }]
    };
    angular.module("search.table.files.model", [])
        .value("SearchTableFilesModel", searchTableFilesModel);
}