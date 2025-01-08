
export type BasePictureDto = {
    name: string;
    picture_data: string[][];
}
export type PictureDto = BasePictureDto & {
    picture_id: string;
    author: {
    user_id: string;
    username: string;
    };
    created_at: string;
    updated_at: string;
};

export type NewPictureRes = {
    failed: false;
    picture_id: string;
};
export type NewPictureReq = BasePictureDto