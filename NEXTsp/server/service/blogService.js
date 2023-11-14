const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify'); //import thu vien slugify

//new class
class BlogService {
    static async addBlogService({ title, description, content, image, status }) {
        if (!title || !description || !content || !image || !status) {
            return { success: false, status: 400, message: 'Missing required parameters' };
        }
        const duplicate = await Blog.findOne({ title });
        if (duplicate) {
            return { success: false, status: 400, message: 'Blog already exists' };
        }

        // Tao slug tu ten blog
        const blogSlug = slugify(title, { lower: true });

        const newBlog = new Blog({ title, description, content, image, status, blogSlug });
        const savedBlog = await newBlog.save();

        return { success: true, message: 'Blog created successfully' };
    }
    static async updateBlogService({title, description, content, image, status }) {
        
}