const sampleData = {
  "example prop": null,
  nancy_mccarty: {
    A1: {
      userID: "nancy_mccarty",
      userName: "Nancy's McCarty",
      id: "A1",
      score: "0.75",
      date_created: 151208443563,
      date_signed: 151208448055,
      date_approved: 151208471190,
      answers: [
          {
              Q1 : true,
              Q2 : false
          },
          {
              Q34 : 'This is an answer',
              Q35 : false
          }
      ]
    },
    A2: {
      userID: "nancy_mccarty",
      userName: "Nancy McCarty",
      id: "A2",
      score: 0.9,
      date_created: 151208450090,
      date_signed: false,
      date_approved: false,
      answers: ["No", "No", "No", "Yes", "Yes"]
    }
  },
  george_richardson: {
    A2: {
      userID: "george_richardson",
      userName: "George Richardson",
      id: "A2",
      score: 0.35,
      date_created: 1512076585058,
      date_signed: false,
      date_approved: false,
      answers: ["No", "Yes", "Yes", "Yes", "Yes"]
    }
  },
  tom_hughe: {
    A4: {
      userID: "tom_hughe",
      userName: "Tom Hughe",
      id: "A4",
      score: 0.75,
      date_created: 1512076575026,
      date_signed: 1512076609894,
      date_approved: false,
      answers: ["Yes", "No", "No", "Yes", "No"]
    },
    M1: {
      userID: "tom_hughe",
      userName: "Tom Hughe",
      id: "M1",
      score: false,
      date_created: 1512076587361,
      date_signed: false,
      date_approved: false,
      answers: [false, false, false, false, false]
    }
  },
  heidy_white: {
    L2: {
      userID: "heidy_white",
      userName: "Heidy White",
      id: "L2",
      score: false,
      date_created: 15120765766312,
      date_signed: false,
      date_approved: false,
      answers: [0, 1, 2, 3, 4]
    }
  }
};

export default sampleData;
