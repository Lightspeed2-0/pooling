// input ? source[pincode] destination[pincode]
// Output ? List of Indents + list of coordinates
// Processs?
// 1user indent details ada vehu namba pooling
// Total capacity , Loaded capacity  - prior = 0
// Common route ...source pincode ........................................ dest pincode .....
// created order source > source(limit 20km) and
// first order airport ->

// -4 - 3 -2 S-1 0 1 S2 3 D4 D5
const { getCordinates, cordinatesDistance } = require("./pincode");
var request = require("request");
requests = {
  Weight: 101,
  Volume: 123,
  srcPincode: 605602,
  desPincode: 600063,
};
Order = [
  {
    remWeight: 1010,
    remVolume: 123,
    srcPincode: 620001,
    desPincode: 600044,
  },
  // {
  //   remWeight: 1010,
  //   remVolume: 123,
  //   srcPincode: 600113,
  //   desPincode: 600011,
  // },
  // {
  //   remWeight: 1010,
  //   remVolume: 123,
  //   srcPincode: 600113,
  //   desPincode: 600012,
  // },
  // {
  //   remWeight: 1010,
  //   remVolume: 123,
  //   srcPincode: 600113,
  //   desPincode: 600013,
  // },
  // {
  //   remWeight: 1010,
  //   remVolume: 123,
  //   srcPincode: 600115,
  //   desPincode: 600011,
  // },
  // {
  //   remWeight: 2010,
  //   remVolume: 125,
  //   srcPincode: 600111,
  //   desPincode: 600011,
  // },
];

let poolingArr = [];

console.log(Order.length);

const pool = async (requests, Order) => {
  console.log(Order.length);
  for (let i = 0; i < Order.length; i++) {
    console.log(
      "here",
      requests.Weight,
      Order[i].remWeight,
      "  ",
      requests.Volume,
      Order[i].remVolume
    );
    if (
      requests.Weight <= Order[i].remWeight &&
      requests.Volume <= Order[i].remVolume
    ) {
      console.log("first");
      let Routes = [];
      let sourcePos = -1;
      let desPos = -1;
      let orderCordinates = getCordinates(
        Order[i].srcPincode,
        Order[i].desPincode
      );
      Routes = await getreq(orderCordinates);
      console.log(Routes);
      let requestsCordinates = getCordinates(
        requests.srcPincode,
        requests.desPincode
      );
      for (let j = 0; j < Routes.length; i++) {
        if (
          cordinatesDistance(
            Routes[j][1],
            Routes[j][0],
            requestsCordinates.src.lat,
            requestsCordinates.src.lng
          ) <= 20
        ) {
          sourcePos = j;
        }
        if (
          cordinatesDistance(
            Routes[j][1],
            Routes[j][0],
            requestsCordinates.des.lat,
            requestsCordinates.des.lng
          ) <= 20
        ) {
          if (sourcePos === -1) {
            break;
          } else {
            poolingArr.push(Order[i]);
            break;
          }
        }
      }
    }
  }
  console.log(poolingArr);
};
const getreq = async (orderCordinates) => {
  let res = [];
  await request(
    {
      method: "GET",
      url: `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624841b747b534394a73b8283ad3de48ff61&start=${orderCordinates.src.lng},${orderCordinates.src.lat}&end=${orderCordinates.des.lng},${orderCordinates.des.lat}`,
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      },
    },
    function (error, response, body) {
      // console.log(error);
      // console.log("Status:", response.statusCode);
      // console.log("Headers:", JSON.stringify(response.headers));
      // console.log("Response:", body);
      body = JSON.parse(body);
      console.log(body);
      res = body;
    }
  ).then((ans) => {
    console.log(ans);
  });
  console.log(res);
  return res;
};
// pool(requests, Order);
let orderCordinates = getCordinates(Order[0].srcPincode, Order[0].desPincode);
let Router = [];
Router = getreq(orderCordinates);
console.log(Router);
