angular.module("resourceApp", ['ngResource'])

    .controller('assetCtrl', function ($scope, $resource) {
        var vm = this;
        var Asset = $resource('api/asset/:id');

        angular.extend(vm, {
            assets: null,
            newAsset: {},
            init: init,
            update: update,
            remove: remove
        });

        function init() {
            var entries = Asset.query(function () {
                vm.assets = entries;
            });
        }

        function update(asset) {
            Asset.update(asset);
        }

        function remove(asset) {
            if (confirm('Are you sure?')) {
                asset.$delete(function() {
                    vm.assets.filter(function(a) {
                        return a.id === asset.id;
                    });
                });
            }
        }
    })
    
    //.service('Asset', function ($http) {

    //    this.getAll = function () {
    //        return $http({ url: 'api/asset' });
    //    }

    //    this.update = function (asset) {
    //        return $http({
    //            url: 'api/asset',
    //            method: 'PUT',
    //            data : asset
    //        });
    //    }

    //    this.create = function (asset) {
    //        return $http({
    //            url: 'api/asset',
    //            method: 'POST',
    //            data : asset
    //        });
    //    }

    //    this.remove = function() {
            
    //    }
    //})
;