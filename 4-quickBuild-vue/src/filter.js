import Vue from 'vue'
Vue.filter('filter-keepDecimal', function (value) {
    return Base.fKeepDecimals(value, 2)
})
