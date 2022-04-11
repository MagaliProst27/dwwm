function getperimetre(){
var  perimetre;
var forme;

switch(arguments.length){
    case 0:
       return "il faut un ou plusieurs arguments ...";
        break;
        case 1:
            perimetre= arguments[0]*4;
            forme="carré";
            break;
            case 2:
                perimetre=arguments[0]*2+arguments[1*2];
                forme="rectangle";
                break;
                case 3:
                   perimetre= arguments[0]+arguments[1]+arguments[2]
                   forme="triangle"
                   break;
    default:
        for (i in arguments){
            perimetre += arguments[i];
        }
        return "vous avez envoyé " 
        +arguments.length
        + "arguments, leur somme fait:"   
        + perimetre
                

}
return "perimetre: "+", c'est un :" + forme
}
console.log(getperimetre());
console.log(getperimetre(5));
console.log(getperimetre(3,2));
console.log(getperimetre(5,5,5));
console.log(getperimetre(10,5,4,3,5));
