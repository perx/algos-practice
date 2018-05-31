var multiply=function(a,b){
	a=a+"";
	b=b+"";
	
	if(a.length==1 && b.length ==1)
		return (parseInt(a)*parseInt(b))+"";
	a.padStart(Math.max(a.length,b.length),"0");
	b.padStart(Math.max(a.length,b.length),"0");
	
	let h=Math.ceil(a.length/2);
	let x1=a.substring(0,h);
	let x2=a.substring(h+1);
	let y1=a.substring(0,h);
	let y2=a.substring(h+1);
	
	let res1=multiply(x1,y1);
	let res2=multiply(x2,y2);
	let res3=multiply(parseInt(x1+x2),parseInt(y1+y2))-res1-res2;
	res1=res1.padEnd(a.length,"0");
	res3=res3.padEnd(h,"0");
	return res1+res2+res3;
};

var add=function(arr1,arr2){
	while(arr1.length>arr2.length)
		arr2.unshift(0);
	while(arr1.length<arr2.length)
		arr1.unshift(0);
	var len1=arr1.length-1;
	var len2=arr2.length-1;	
	var ans=[];
	var carry=0;
	while(len1>=0 && len2>=0){
		var add=arr1[len1]+arr2[len2]+carry;
		if((add/10)>0)
		{
			carry=parseInt(add/10);
			add=add%10;
		}
		else
		{
			carry=0;
		}
		ans.unshift(add);
		len1--;
		len2--;
	}
	
	if(carry>0)
		ans.unshift(carry);
		
	return ans;
};
var subtract=function(arr1,arr2){
	while(arr1.length>arr2.length)
		arr2.unshift(0);
	while(arr1.length<arr2.length)
		arr1.unshift(0);		
	var len1=arr1.length-1;
	var len2=arr2.length-1;	
	var ans=[];
	var carry=0;
	while(len1>=0 && len2>=0){
		var sub=arr1[len1]-arr2[len2]-carry;
		if(sub<0)
		{
			carry=1;
			sub+=10;
		}	
		else{
			carry=0;
		}
		ans.unshift(sub);
		len1--;
		len2--;
	}
	while(ans[0]==0)
	{
		ans.shift();
	}
	if(carry>0){
		var inverse_power=Array(ans.length+1).fill(0);
		inverse_power[0]=1;
		ans=subtract(inverse_power,ans);
		ans[0]=-ans[0];
	}
	return ans;
};

exports.add=add;
exports.sub=subtract;