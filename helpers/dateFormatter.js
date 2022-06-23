function dateFormatter(value){
    return value.toISOString().slice(0,10)
}

module.exports = dateFormatter