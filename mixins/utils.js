var utilsMixin = {
    created: function(){
        console.log("utilsMixin.created()");
    },
    methods: {
        isValid: function(s){
           return s['Outcome Year'] > 1900 && s['Discipline'].length > 0;
        },
        isStem: function(s) {
            // array of stem substrings
            var stemNames = ['math','bio','med', 'health', 'psych', 'engineering', 'neuro', 'physical science', 'physics', 'anthro', 'chem', 'life', 'computer', 'geo', 'ecology', 'sociology', 'political', 'information', 'statistics','criminology'];
            var elem = s['Discipline'];
            var containsName = function(name) {
              return !(elem.toLowerCase().indexOf(name) === -1);
            }
            // array of true or false, where true if includes any of stemNames
            var res = stemNames.map(containsName);
            // return true if _any_ of the results are true
            return res.some(function(b){ return b === true ;})
        }
    }
};

export default utilsMixin;