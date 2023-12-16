const {transform}=require("./case-gadgets.js");

var testName="just another party dance";

var testNameVariants={
  kebabcase:"just-another-party-dance",
  pascalcase:"JustAnotherPartyDance",
  camelcase:"justAnotherPartyDance",
  snakecase:"just_another_party_dance",
  snakecasecabs:"JUST_ANOTHER_PARTY_DANCE",
  initialcase:"japd",
  initialcasecabs:"JAPD"
};
var skipTransformFrom=[
  "initialcase",
  "initialcasecabs"
];
var skipTransformTo=[];

test(`testint transform of "${testName}" cases variants`, () => {
  for(var fromCase in testNameVariants)if(!skipTransformFrom.includes(fromCase)){
    for(var toCase in testNameVariants)if(!skipTransformTo.includes(toCase)){
      expect(
        transform(testNameVariants[fromCase])
          .from(fromCase)
          .to(toCase)
          .GO
        ).toBe(testNameVariants[toCase]);
    }
  }
});
