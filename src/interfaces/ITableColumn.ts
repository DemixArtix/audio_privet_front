export default interface ITableColumn {
  headerName: string,
  field: string,
  width?: number,
  inPercent?: boolean,
  notCalculated?: boolean,
  footerText?: string,
}