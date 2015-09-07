angular.module("resourceApp", ['ngResource'])

    .controller('assetCtrl', function ($scope, $resource) {
        var vm = this;
        var Asset = $resource('/api/asset/:id', { id: '@id' }, { update: { method: 'PUT' } });

        angular.extend(vm, {
            assets: null,
            newAsset: {},
            save: save,
            init: init,
            update: update,
            remove: remove
        });

        function init() {
            var entries = Asset.query(function () {
                vm.assets = entries;
            });
        }

        function save() {
            var a = new Asset();
            angular.copy(vm.newAsset, a);
            a.$save(function (res) {
                vm.assets.push(res);
            });
        }

        function update(asset) {
            asset.$update(function (res) {
                console.log(res);
            });
        }

        function remove(asset) {
            if (confirm('Are you sure?')) {
                asset.$delete(function (res) {
                    vm.assets = vm.assets.filter(function (obj) {
                        return obj.id !== res.id;
                    });
                });
            }
        }
    })
;