export default interface tableRow {
  "countView": number,
  "countPlay": number,
  "countSend": number,
  "countOrder": number,
  "countPay": number,
  "parentId": number,
  "categoryId": number,
  "nameId": null,
  "id": number,
  "title": string,
  "viewSend": number,
  "viewPay": number,
  "children"?: tableRow[]
}