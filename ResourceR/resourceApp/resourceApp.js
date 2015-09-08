angular.module("resourceApp", ['ngResource', 'ngProgress', 'datePicker'])

    .controller('assetCtrl', ['$resource', 'ngProgressFactory', function ($resource, ngProgressFactory) {

        var vm = this;
        var Asset = $resource('/api/asset/:id', { id: '@id' }, { update: { method: 'PUT' } });

        angular.extend(vm, {
            assets: null,
            newAsset: {
                assetName : '',
                team : ''
            },
            save: add,
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

        function update(asset) {
            vm.progress.start();
            asset.isLocked = asset.currentOwner !== '' && asset.currentOwner !== null && asset.currentOwner !== undefined;
            asset.$update(function (res) {
                vm.progress.complete();
            });
        }

        function remove(asset) {
            if (confirm('This will remove the entire resource. Are you sure you want to do this?')) {
                vm.progress.start();
                asset.$delete(function (res) {
                    vm.assets = vm.assets.filter(function (obj) {
                        return obj.id !== res.id;
                    });
                    vm.progress.complete();
                });
            }
        }
    }])
;