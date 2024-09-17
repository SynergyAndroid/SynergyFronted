type MarkerColor = "RED" | "YELLOW" | "GREEN" |  "BLUE" |  "PURPLE";

// 카테고리의 정보 
// 색상에 따라 커스텀하게 장소를 등록하게끔 함 
type Category = {
    [key in MarkerColor] : string;
};

interface ImageUri {
    id?: number;
    uri: string;

}

interface Marker {
    id:number,
    latitude:number;
    longitude: number;
    score:number;

}

interface Post extends Marker {
    title: string;
    address:string;
    date: Date | string;
    description : string;
}

//유저의 정보
interface Profile {
    id: number;
    email: string;
    nickname:string | null;
    imageUri : string | null;
    kakaoImageUri:string | null;
    loginType:'email' | 'kakao' ;
}

export type {MarkerColor, Category, ImageUri, Marker, Post, Profile};