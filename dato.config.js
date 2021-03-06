var $ = require("jquery");
var parser = require('json-parser');
var algoliasearch = require('algoliasearch');

module.exports = (dato, root, i18n) => {
  // console.log(dato.manuals);
  root.directory("content/manuals", (dir) => {
    dato.manuals.forEach((manuals) => {
        // console.log(manuals.carSpecs.csalgoliayears);
        var object = JSON.stringify(manuals.carSpecs.csalgoliayears);
        var newobj = JSON.parse(object);
        dir.createPost(`${manuals.currencyUrl}.${manuals.manualCurrency}.md`, "yaml", {
          frontmatter: {
            title: manuals.manualTitle,
            manualname: manuals.manualName,
            type: "manual",
            sku: manuals.manualSku,
            currency: manuals.manualCurrency,
            donwloadid: manuals.manualDownloadId,
            manualstatus: manuals.manualStatus,
            sendowl: manuals.manualSendowl.soString,
            sendowlprice: manuals.manualSendowl.soPrice,
            manualdescription: manuals.manualDescription.descText,
            manualengcover: manuals.manualEngines.engTable,
            manualcover: manuals.manualToc.tocDescription,
            overallrate: manuals.review.revOverallRating,
            manualreview: manuals.review.blockReview.toMap(),
            carspecs: manuals.carSpecs.toMap(),
            makes: manuals.carSpecs.cpMake,
            series: manuals.carSpecs.cpSerie,
            subseries: manuals.carSpecs.cpSubSerie,
            platform: manuals.carSpecs.cpPlatform,
            years: manuals.carSpecs.cpYears,
            bodytype: manuals.carSpecs.cpBodyType,
            fueltype: manuals.carSpecs.cpFuelType,
            addtocart: manuals.addToCart.addToCartList,
            catimage: manuals.imageCatalogPage,
            proimage: manuals.imageProductPage,
            url: manuals.currencyUrl,
            slug: manuals.currencyUrl,
            mssuitable: manuals.manualSpecs.manualSpecSuitable,
            mslanguage: manuals.manualSpecs.msLanguage,
            msformat: manuals.manualSpecs.msFormat,
            msfilesize: manuals.manualSpecs.msFileSize,
            mspages: manuals.manualSpecs.msPages,
            mstype: manuals.manualSpecs.msType,
            manualporp: manuals.propCons.pro,
            manualcons: manuals.propCons.con,
            cptitle: manuals.manualTitleCp,
            yearscp: newobj
          },
          content: manuals.partialPreview.previewDesc
        });
      });
  });

  var myall = []
  var mybrand = []
  var j = 1
  var checkbrand = [];
  dato.manuals.forEach((Manuals, i) => {
      var content = {};
      var brand = {};
      content['make'] = Manuals.carSpecs.cpMake;
      content['series'] = Manuals.carSpecs.cpSerie;
      content['subseries'] = Manuals.carSpecs.cpSubSerie;
      var platform = JSON.stringify(Manuals.carSpecs.algoliaplatform);
      var years = JSON.stringify(Manuals.carSpecs.csalgoliayears);

      content['platform'] = JSON.parse(platform);
      content['years'] = JSON.parse(platform);
      content['bodytype'] = Manuals.carSpecs.cpBodyType;
      content['fueltype'] = Manuals.carSpecs.cpFuelType;
      content['title'] = Manuals.manualTitle;
      content['catimage'] = Manuals.imageCatalogPage;
      content['proimage'] = Manuals.imageProductPage;
      content['url'] = Manuals.manualSku;
      content['manualname'] = Manuals.manualName;
      content['currency'] = Manuals.manualCurrency;
      content['price'] = Manuals.manualSendowl.soPrice;
      content['rate'] = Manuals.review.revOverallRating;
      content['cptitle'] = Manuals.manualTitleCp
      myall.push(content)
      if(j == 1){
        checkbrand.push(Manuals.carSpecs.cpMake);
        brand['make'] = Manuals.carSpecs.cpMake;
        brand['url'] = Manuals.carSpecs.cpMake.toLowerCase();
        mybrand.push(brand)
        j++;
      }
      var index = checkbrand.indexOf(Manuals.carSpecs.cpMake);
      if(index == -1){
        checkbrand.push(Manuals.carSpecs.cpMake);
        brand['make'] = Manuals.carSpecs.cpMake;
        brand['url'] = Manuals.carSpecs.cpMake.toLowerCase();
        mybrand.push(brand)
      }
  });
  
  var client = algoliasearch("YZO8M6AZ6J", "847f24047332edf2bb6a0c1f0181b83e");
  var index = client.initIndex('cml-new');
  index.clearIndex(function(err, content) {
    console.log(content);
  });

  root.createDataFile(`data/data.json`, 'json', myall)
  root.createDataFile(`data/makes.json`, 'json', mybrand)

  index.addObjects(myall, function(err, content) {
    console.log(content);
  });

  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.aud.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.cad.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.chf.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.eur.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.gbp.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.hkd.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.inr.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.nzd.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.sgd.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.usd.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
  root.directory("content/", (dir) => {
    dato.pages.forEach((Page, i) => {
        dir.createPost(`${Page.slug}.zar.md`, "yaml", {
          frontmatter: {
            title: Page.pgeTitle,
            type: "mypage",
            description: Page.pageDescription,
            weight: i
          },
          content: Page.pageDescription
        });
      });
  });
}
