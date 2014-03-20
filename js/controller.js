var etsyApp = angular.module('etsyApp', []);
 
etsyApp.controller('etsyListCtrl', function ($scope, $http) {
        
    $scope.offset = 0;
    $scope.url = 'https://openapi.etsy.com/v2/listings/active.js?';
    $scope.sortOrder = '';
    $scope.sortOn = '';
    
    $scope.config = {
        callback : 'JSON_CALLBACK',
        includes: 'Images:1:0',
        api_key: 'wmpct3cpbk8y15y99jrg2o1a',
        keywords: '',
        limit: '10',
        offset: $scope.offset,
        sort_order: $scope.sortOrder,
        sort_on: $scope.sortOn
    };
    
    $scope.fetch = function(){
        
        var uri = $scope.url;
        
        for(var attr in $scope.config){
            if($scope.config[attr] === ''){
                continue;
            }
            uri += attr + '=' + $scope.config[attr] + '&';
        };
        
        console.log(uri);
        $http.jsonp(uri).success(function(data){
            if(data.ok){
                $scope.catalog = data;
            }else{
                console.log(data.error);
            };
        });
        
    };
     
    $scope.delete = function(id){
        console.log(id);
        $scope.catalog.results.splice(id, 1);
    };
    
    $scope.seeResultSet = function(n){
        $scope.config.offset =  $scope.config.offset + n;
        if($scope.config.offset > $scope.count || $scope.config.offset < 0){
            return false;
        };
            
        $scope.fetch();
    };
    
    $scope.toggleForm = function(){
        var form =  $('.form-column');
        var direction = $('.form-column').hasClass('open')?'-100%':0;
        form.animate({
            right: direction
        }).toggleClass('open');
        
        setTimeout(function(){
            form.attr('style','');
        }, 500);
        
    };
    
    
    $scope.fetch();
    
});
