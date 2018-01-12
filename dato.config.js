module.exports = (dato, root, i18n) => {
  console.log(dato.manuals);
  root.directory("content/manual", (dir) => {
    dato.manuals.forEach((manuals) => {
        dir.createPost(`${manuals.url}.md`, "yaml", {
          frontmatter: {
            title: manuals.manualTitle,
            type: "manual",
            sku: manuals.manualSku,
            currency: manuals.manualCurrency,
            donwloadid: manuals.manualDownloadId,
            manualstatus: manuals.manualStatus,
            sendowl: manuals.manualSendowl.soString,
            manualdescription: manuals.manualDescription.descText,
            manualengcover: manuals.manualEngines.engTable,
            manualcover: manuals.manualToc.tocDescription,
            overallrate: manuals.review.revOverallRating,
            manualreview: manuals.review.blockReview.toMap(),
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
            url: manuals.url,
            slug: manuals.url,
            mssuitable: manuals.manualSpecs.manualSpecSuitable,
            mslanguage: manuals.manualSpecs.msLanguage,
            msformat: manuals.manualSpecs.msFormat,
            msfilesize: manuals.manualSpecs.msFileSize,
            mspages: manuals.manualSpecs.msPages,
            mstype: manuals.manualSpecs.msType,
            manualporp: manuals.propCons.pro,
            manualcons: manuals.propCons.con
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
      content['series'] = Manuals.carSpecs.cpSubSerie;
      content['series'] = Manuals.carSpecs.cpSubSerie;
      content['platform'] = Manuals.carSpecs.cpPlatform;
      content['years'] = Manuals.carSpecs.cpYears;
      content['bodytype'] = Manuals.carSpecs.cpBodyType;
      content['fueltype'] = Manuals.carSpecs.cpFuelType;
      content['title'] = Manuals.manualTitle;
      content['catimage'] = Manuals.imageCatalogPage;
      content['proimage'] = Manuals.imageProductPage;
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
  root.createDataFile(`data/data.json`, 'json', myall)
  root.createDataFile(`data/makes.json`, 'json', mybrand)
}
