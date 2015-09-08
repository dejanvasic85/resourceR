angular.module("resourceApp", ['ngResource', 'ngProgress', 'datePicker'])

    .controller('assetCtrl', function ($resource, ngProgressFactory) {

        var vm = this;
        var Asset = $resource('/api/asset/:id', { id: '@id' }, { update: { method: 'PUT' } });

        angular.extend(vm, {
            assets: null,
            newAsset: {},
            save: add,
            lock: lock,
            unlock: unlock,
            init: init,
            update: update,
            remove: remove,
            progress: ngProgressFactory.createInstance(),
            teamFilter: ''
        });

        function init() {
            vm.progress.setHeight('4px');
            vm.progress.start();
            var entries = Asset.query(function () {
                vm.assets = entries;
                vm.progress.complete();
                vm.teamOptions = _.uniq(_.pluck(entries, 'team'));
            });
        }

        function add() {
            vm.progress.start();
            var a = new Asset();
            angular.copy(vm.newAsset, a);
            a.$save(function (res) {
                vm.assets.push(res);
                vm.progress.complete();
                vm.newAsset = {};
                if (vm.teamOptions.indexOf(res.team) === -1) {
                    vm.teamOptions.push(res.team);
                }
            });
        }

        function lock(asset) {
            asset.isLocked = true;
            update(asset);
        }

        function unlock(asset) {
            asset.isLocked = false;
            asset.currentOwner = null;
            asset.estimatedCompletion = null;
            update(asset);
        }

        function update(asset) {
            vm.progress.start();
            asset.isLocked = asset.currentOwner !== '';
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