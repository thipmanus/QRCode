alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,-.:;=?@[]^_`{|}~";

permuted = "QU2HAd0w3VCspWrokXmyNzYbIJKvLMhij85DOn1Sce49gP7BEuTfZ6FxqRlatG!#$%&()*+,-.:;=?@[]^_`{|}~";


word = '!#$%&()*+,-.:;=?@[]^_`{|}~' //input

i=0;

result = "";

　
//loop receive 
while (i < word.length) {
    //ถ้า word ไม่อยู่ใน alphabet จะออกมาเป็นตัวเดิม
　　ind = alphabet.indexOf(word.charAt(i));
    
    result = result + permuted.charAt(ind); //expected is 28KTKScS_ZF
    result2 = result2 + word.charAt(ind);
    i++;

}

　

result

console.log(result)