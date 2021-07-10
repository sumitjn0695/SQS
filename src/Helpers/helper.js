let HELPERS = {
  formatToCurrency: (amount) => {
    return "$" + parseInt(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,").slice(0, -3);
  },
  saveCategory: (value)=>{
      localStorage.setItem("category", value)
  },
  fetchCategory: ()=>localStorage.getItem("category")
};

export default HELPERS;
