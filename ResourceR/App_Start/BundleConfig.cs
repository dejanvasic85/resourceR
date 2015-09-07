using System.Web;
using System.Web.Optimization;

namespace ResourceR
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/angular/angular.js")
                .IncludeDirectory("~/Scripts/angular", "*.js", true)
                .Include("~/Scripts/bower_components/ngprogress/build/ngprogress.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/resourceApp").IncludeDirectory("~/resourceApp", "*.js", true));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.lumen.css",
                      "~/Content/site.css",
                      "~/Scripts/bower_components/ngprogress/ngProgress.css"));
        }
    }
}
