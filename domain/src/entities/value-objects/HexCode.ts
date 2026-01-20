export class HexCode {
    readonly value: string;

    constructor(value: string){
        if(value.length < 3 || value.length > 6){
            throw new Error("the code must be between 3 to 6 characters");
        }
        const isHex = /^[0-9A-F]+$/i.test(value);
        if (!isHex) {
            throw new Error("invalid characters");
        }
        this.value = value;
    }
    
    equals(other: HexCode): boolean {
        return this.value === other.value;
    }
}