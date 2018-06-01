var karatsuba=function(a,b){
	a=a+"";
	b=b+"";
	
	if(a.length==1 && b.length ==1)
		return (parseInt(a)*parseInt(b))+"";
	a.padStart(Math.max(a.length,b.length),"0");
	b.padStart(Math.max(a.length,b.length),"0");
	
	return multiply([...a],[...b]).join('');
};
var multiply=function(arr1,arr2){
	if(arr1.length==1 && arr2.length ==1)
		return [arr1[0]*arr2[0]];
	
	//padding the arrays
	while(arr1.length>arr2.length)
		arr2.unshift(0);
	while(arr1.length<arr2.length)
		arr1.unshift(0);	
	
	//carry out multiplication
	let ans=[];
	let h=Math.floor(arr1.length/2),factor=Math.ceil(arr1.length/2);
	let a=arr1.slice(0,h),b=arr1.slice(h);
	let c=arr2.slice(0,h),d=arr2.slice(h);
	console.log("half is",h);
	let res1=multiply(a,c);
	let res2=multiply(b,d);
	let res3=multiply(add(a,b),add(c,d));
	let res4=add(res1,res2);
	let term3=subtract(res3,res4);
	console.log("before padding",res1,term3,res2);
	
	for(let j=0;j<2*factor;j++){
		res1.push(0);
	}
	
	
	for(let j=0;j<factor;j++){
		term3.push(0);	
	}
	console.log("after padding",res1,term3,res2);
	ans=add(res1,add(res2,term3));
	//remove padding
	while(ans[0]==0)
	{
		ans.shift();
	}
	return ans;
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
exports.multiply=multiply;
exports.karatsuba=karatsuba;