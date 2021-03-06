module ngApp.participants {
  "use strict";

  import IParticipantsService = ngApp.participants.services.IParticipantsService;
  import IParticipant = ngApp.participants.models.IParticipant;

  /* @ngInject */
  function participantsConfig($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state("case", {
      url: "/cases/:caseId?{bioId:any}",
      controller: "ParticipantController as pc",
      templateUrl: "participant/templates/participant.html",
      resolve: {
        numCasesAggByProject: (
          $stateParams: ng.ui.IStateParamsService,
          $http: ng.IHttpService,
          config: IGDCConfig
        ): ng.IPromise => {
          return $http({
            method: 'GET',
            url: `${config.api}/case_ssms?facets=project.project_id.raw&size=0`,
            headers: {'Content-Type' : 'application/json'},
          }).then(({ data }) => {
            return data.data.aggregations['project.project_id.raw'].buckets;
          });

        },
        participant: ($stateParams: ng.ui.IStateParamsService, ParticipantsService: IParticipantsService): ng.IPromise<IParticipant> => {
          if (! $stateParams.caseId) {
            throw Error('Missing route parameter: caseId. Redirecting to 404 page.');
          }
          return ParticipantsService.getParticipant($stateParams["caseId"], {
            fields: [
              "case_id",
              "submitter_id",
              "annotations.annotation_id",

              "samples.sample_type_id",
              "samples.time_between_excision_and_freezing",
              "samples.oct_embedded",
              "samples.tumor_code_id",
              "samples.submitter_id",
              "samples.intermediate_dimension",
              "samples.sample_id",
              "samples.is_ffpe",
              "samples.pathology_report_uuid",
              "samples.tumor_descriptor",
              "samples.sample_type",
              "samples.current_weight",
              "samples.composition",
              "samples.time_between_clamping_and_freezing",
              "samples.shortest_dimension",
              "samples.tumor_code",
              "samples.tissue_type",
              "samples.days_to_sample_procurement",
              "samples.freezing_method",
              "samples.preservation_method",
              "samples.days_to_collection",
              "samples.initial_weight",
              "samples.longest_dimension",
           ],
           expand: [
            "demographic",
            "diagnoses",
            "diagnoses.treatments",
            "exposures",
            "family_histories",
            "files",
            "project",
            "project.program",
            "summary",
            "summary.experimental_strategies",
            "summary.data_categories",
            "samples.portions.*",
           ]
          });
        }
      }
    });
  }

  angular
      .module("ngApp.participants", [
        "participants.controller",
        "ui.router.state"
      ])
      .config(participantsConfig);
}
