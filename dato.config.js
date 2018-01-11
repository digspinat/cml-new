module.exports = (dato, root, i18n) => {
  console.log(dato.manuals);
  root.directory("content/manuals", (dir) => {
    dato.manuals.forEach((manuals) => {
        dir.createPost(`${manuals.url}.md`, "yaml", {
          frontmatter: {
            title: manuals.manualTitle,
            type: "manual",
            sku: manuals.manualSku,
            currency: manuals.manualCurrency,
            donwloadid: manuals.manualDownloadId,
            manualstatus: manuals.manualStatus,
            sendowl: manuals.manualSendowl.toMap(),
            manualdescription: manuals.manualDescription.descText,
            manualcover: manuals.manualEngines.engTable,
            manualcover: manuals.manualToc.tocDescription,
            overallrate: manuals.review.revOverallRating,
            manualreview: manuals.review.blockReview.toMap(),
            carspec: manuals.carSpecs.toMap(),
            manualspec: manuals.manualSpecs.toMap(),
            addtocart: manuals.addToCart.addToCartList,
            catimage: manuals.imageCatalogPage,
            proimage: manuals.imageProductPage
          },
          content: manuals.manualTitle
        });
      });
  });
}
