// 設計師日報表是否顯示互助獲得金額部分 // 日報表當日與累積金額皆為0則該欄位不出現(店販特殊抽互助使用除外)

const api = (request) => () => {
  const variables = {};
  const query = `
  query{
    getPriceDisplayOnDailyReportDefault {
      isPriceDisplayOnDailyReport
      isServiceTicketMerged
      isHelperPointPriceDisplay
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
