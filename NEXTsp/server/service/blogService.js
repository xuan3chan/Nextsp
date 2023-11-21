const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify');// thu vien nay khong xai, tai khong biet xai cho nao cho hop ly

class BlogService {
    static async addBlogService({ title, description, content, image, status }) {
        try {
            if (!title || !description || !content || !image || !status) {
                throw { status: 400, message: 'Missing required parameters' };
            }
            // Check for duplicate blog
            const duplicateBlog = await Blog.findOne({ title });
            if (duplicateBlog) {
                throw { status: 400, message: 'Blog already exists' };
            }

            //Su ly hinh anh
            //1
            if (req.files) {
                const originalnames = req.files.map(file => file.originalname);
                const uniqueOriginalnames = new Set(originalnames);
                if (uniqueOriginalnames.size < originalnames.length) {
                    throw { status: 400, message: 'Duplicate file names are not allowed' };
                }
            }
            //Create a new blog instance
            const newBlog = new Blog({
                title,
                description,
                content,
                image,
                status,
            });
            //2
            if (req.files && req.files.length > 0) {
                const imagePaths = req.files.map(el => el.path);
                newBlog.images.push(...imagePaths);
            }
            console.log(req.files);
            //save the new blog
            const savedBlog = await newBlog.save();

            //   const blogSlug = slugify(title, { lower: true });

            //Khuc nay tu nhien khong viet xai sao cho hop ly
            //   const newBlog = new Blog({ title, description, content, image, status, blogSlug });
            //   await newBlog.save();


            //tiep tu la ham su ly hinh anh: destroy
            return { success: true, message: 'Blog created successfully', blog: savedBlog };
        } catch (error) {
            // If an error occurs, delete the files from Cloudinary
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const publicId = file.filename; // replace with the correct public ID
                    cloudinary.uploader.upload.destroy(publicId, function (error, result) {
                        console.log(result, error);
                    });
                }
            }
            // Re-throw the error
            throw error;
        }
    }
    //update a blog
    static async updateBlogService(req, { blogId, title, description, content, image, status }) {
        try {
            //Find the blog
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw { status: 404, message: 'Blog not found' };
            }
            const duplicateBlog = await Blog.findOne({ title });
            if (duplicateBlog) {
                throw { status: 400, message: 'A blog with this title already exists' };
            }
            //Update the blog fields
            if (title) blog.title = title;
            if (description) blog.description = description;
            if (content) blog.content = content;
            if (image) blog.image = image;
            if (status) blog.status = status;

            //check for duplicate originalnames in req.files
            if (req.files) {
                const originalnames = req.files.map(file => file.originalname);
                const uniqueOriginalnames = new Set(originalnames);
                if (uniqueOriginalnames.size < originalnames.length) {
                    throw { status: 400, message: 'Duplicate file names are not allowed' };
                }
                //update the blog images
                const imagePaths = req.files.map(el => el.path);
                blog.images.push(...imagePaths); //add the new images to the existing images

                //if there are more than 1 images, delete the oldest ones

                //wrong khuc nay
                if (product.images.length > 1) {
                    // Get the images to delete
                    const imagesToDelete = product.images.splice(1); // Get the images to delete
                    const deletePromises = imagesToDelete.map(imagePath => {
                        const splitUrl = imagePath.split('/');
                        const filename = splitUrl[splitUrl.length - 1].split('.')[0]; // Get the filename from the URL
                        const publicId = `NEXTsp/${filename}`; // Construct the publicId
                        return cloudinary.uploader.upload.destroy(publicId);
                    });

                    try {
                        await Promise.all(deletePromises);
                        console.log('All images deleted successfully');
                    } catch (error) {
                        console.log('Error in deleting images: ', error);
                    }
                }
            }

            //save the updated blog
            const updatedBlog = await blog.save();
            return { success: true, message: 'Blog updated successfully', blog: updatedBlog };
        } catch (error) {
            // If an error occurs, delete the files from Cloudinary
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const publicId = file.filename; // replace with the correct public ID
                    cloudinary.uploader.upload.destroy(publicId, function (error, result) {
                        console.log(result, error);
                    });
                }
            }
        }
    }
    //delete a blog
    static async deleteBlogService(blogId) {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
        throw { status: 404, message: 'Blog not found' };
    }
    //delete all images from Cloudinary
    for (const image of blog.images) {
        const splitUrl = image.split('/');
        const filename = splitUrl[splitUrl.length - 1].split('.')[0]; // Get the filename from the URL
        const publicId = `NEXTsp/${filename}`; // Construct the publicId
        cloudinary.uploader.upload.destroy(publicId, function (error, result) {
            console.log(result, error);
        });
    }
    return { success: true, message: 'Blog deleted successfully' };
}
    //getdetail blog by id
    static async getDetailsBlogService(blogId) {
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw { status: 404, message: 'Blog not found' };
    }
    return { success: true, message: 'Blog found', blog };
}
    //search blog by title
    static async searchBlogService(title) {
    const blog = await Blog.find({ title: { $regex: title, $options: 'i' } });
    if (!blog) {
        throw { status: 404, message: 'Blog not found' };
    }
    return { success: true, message: 'Blog found', blog };
}
    //get all blog
    static async getAllBlogsService() {
    const blogs = await Blog.find().populate({
        path: 'category',
        select: 'nameCategory _id',
    });
    if (!blogs.length) {
        return { success: false, message: 'No blogs found' };
    }
    const extractedBlogs = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        status: blog.status,
        category: blog.category ? {
            name: blog.category.nameCategory,
            id: blog.category._id,
        } : null,
    }));
    return { success: true, message: 'Blog details', blogs: extractedBlogs };
}
}


module.exports = BlogService;
