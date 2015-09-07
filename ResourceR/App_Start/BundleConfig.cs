using System.Web.Optimization;

namespace ResourceR
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Third party scripts
            bundles.Add(new ScriptBundle("~/bundles/depend")
                .Include("~/Scripts/bower_components/jquery/dist/jquery.js")
                .Include("~/Scripts/bower_components/moment/moment.js")
                .Include("~/Scripts/bower_components/angular/angular.js")
                .Include("~/Scripts/bower_components/angular-resource/angular-resource.js")
                .Include("~/Scripts/bower_components/angular-moment/angular-moment.js")
                .Include("~/Scripts/bower_components/angular-datepicker/dist/index.js")
                .Include("~/Scripts/bower_components/ngprogress/build/ngprogress.js")
                .Include("~/Scripts/bower_components/bootstrap/dist/js/bootstrap.js")
                );

            // Our Application
            bundles.Add(new ScriptBundle("~/bundles/resourceApp")
                .IncludeDirectory("~/resourceApp", "*.js", true)
                );

            // Bootstrap - needs to have specific relative path to pick up the fonts
            bundles.Add(new StyleBundle("~/Scripts/bower_components/bootstrap/css/bootstrap")
                .Include("~/Scripts/bower_components/bootstrap/dist/css/bootstrap.css")
                );
            
            // Our Styles
            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Scripts/bower_components/ngprogress/ngProgress.css")
                .Include("~/Scripts/bower_components/angular-datepicker/dist/index.css")
                .Include("~/Content/site.css")
                );
        }
    }
}
