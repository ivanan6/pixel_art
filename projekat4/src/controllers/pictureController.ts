import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createAPIError } from "../utils/createAPIError";
import { PictureDto,BasePictureDto } from "@/types/picture";
const Picture = require('../models/Picture')
const pictures: any[] = []; // In-memory storage za slike

export const getPictures = async (req: Request, res: Response) => {
  //res.json({ failed: false, pictures, total: pictures.length });
  const {limit =9,page=1,author,older_first} = req.query;
  const filters: any = {};
  if (author) filters["author.user_id"] = author;
 
  const sort = older_first ? { created_at: 1 } : { created_at: -1 };
  try {
    const count = await Picture.countDocuments({})
    const pictures = await Picture.find(filters)
      .sort(sort)
      .skip((+Number(page) - 1) * +limit)
      .limit(+Number(limit));
    res.json({ failed: false, pictures, total:count });
  } catch (err) {
    res.status(500).json({ failed: true, error: "SERVER_ERROR" });
  }

};

export const getPictureById = async (req: Request, res: Response, next: NextFunction) => {
  //const picture = pictures.find((p) => p.id === req.params.pictureId);

  const picture = await Picture.findOne({picture_id: req.params.pictureId})

  if (!picture) {
    return next(createAPIError("NO_SUCH_ENTITY", null, 404));
  }

  res.json({ failed: false, picture });
};

export const createPicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, picture_data } = req.body;

    // const picture = {
    //   id: uuidv4(),
    //   name,
    //   picture_data,
    //   author: req.user,
    //   created_at: new Date().toISOString(),
    //   updated_at: new Date().toISOString(),
    // };

    // pictures.push(picture);
    
    const picture = new Picture({
      picture_id: uuidv4(),
      name,
      picture_data,
      author:{ user_id:req.user?.userId,username:req.user?.username},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    await picture.save()
    res.status(201).json({ failed: false, picture_id: picture.id });
  } catch (err) {
    next(err);
  }
};

export const updatePicture = async (req: Request, res: Response, next: NextFunction) => {
  //const picture = pictures.find((p) => p.id === req.params.pictureId);
  const {name, picture_data} = req.body;
  try {
    const picture = await Picture.findOneAndUpdate({picture_id: req.params.pictureId},{
    name:name,
    picture_data:picture_data,
    updated_at: new Date().toISOString()
  },
  {new:true}
)


  if (!picture) {
    return next(createAPIError("NO_SUCH_ENTITY", null, 404));
  }

  if (picture.author.user_id !== req.user?.userId) {
    return next(createAPIError("NOT_YOURS", null, 403));
  }
  } catch (error) {
    return next(error)
  }
  

  //Object.assign(picture, req.body, { updated_at: new Date().toISOString() });

  res.json({ failed: false });
};

export const deletePicture = async (req: Request, res: Response, next: NextFunction) => {
  // const index = pictures.findIndex((p) => p.id === req.params.pictureId);

  // if (index === -1) {
  //   return next(createAPIError("NO_SUCH_ENTITY", null, 404));
  // }

  // if (pictures[index].author.userId !== req.user?.userId) {
  //   return next(createAPIError("NOT_YOURS", null, 403));
  // }

  // pictures.splice(index, 1);
  console.log( `Token: user id : ${req.user?.userId}`)
  try {
    const picture = await Picture.findOne({picture_id: req.params.pictureId})
    console.log( `User id slike: user id : ${picture.author.user_id}`)

    if (!picture) {
      return next(createAPIError("NO_SUCH_ENTITY", null, 404));
      
    }
    if(picture.author.user_id!== req.user?.userId){
      return next(createAPIError("NOT_YOURS", null, 403));
    }
    
    await Picture.findByIdAndDelete(picture._id);
    res.json({ failed: false });
  } catch (error) {
    return next(error)
  }
  


  
};
