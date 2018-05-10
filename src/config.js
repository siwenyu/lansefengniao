/* eslint-disable  */
export default {  
	install(Vue,options)  
	{  
        Vue.prototype.ajaxUrl = 'http://47.94.10.18:8989';  
        
	  	Vue.prototype.isAdmin = false;
	  	Vue.prototype.setIsAdmin = function(index){
              this.isAdmin = true;
        }
	   
        Vue.prototype.jsonData = {
            credentials: 'include',
            dataType: 'JSONP'
        }
		  
	

	}  
}  