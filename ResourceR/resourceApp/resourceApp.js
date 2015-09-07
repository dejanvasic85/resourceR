angular.module("resourceApp", ['ngResource', 'ngProgress'])

    .controller('assetCtrl', function ($resource, ngProgressFactory) {

        var vm = this;
        var Asset = $resource('/api/asset/:id', { id: '@id' }, { update: { method: 'PUT' } });

        angular.extend(vm, {
            assets: null,
            newAsset: {},
            save: save,
            init: init,
            update: update,
            remove: remove,
            progress : ngProgressFactory.createInstance()
        });

        function init() {
            vm.progress.start();
            var entries = Asset.query(function () {
                vm.assets = entries;
                vm.progress.complete();
            });
        }

        function save() {
            vm.progress.start();
            var a = new Asset();
            angular.copy(vm.newAsset, a);
            a.$save(function (res) {
                vm.assets.push(res);
                vm.progress.complete();
                vm.newAsset = {};
            });
        }

        function update(asset) {
            vm.progress.start();
            asset.$update(function (res) {
                vm.progress.complete();
            });
        }

        function remove(asset) {
            if (confirm('Are you sure?')) {
                vm.progress.start();
                asset.$delete(function (res) {
                    vm.assets = vm.assets.filter(function (obj) {
                        return obj.id !== res.id;
                    });
                    vm.progress.complete();
                });
            }
        }
    })
;