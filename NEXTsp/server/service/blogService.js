const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify'); //import thu vien slugify

class BlogService {
    static async addBlogService({ title, description, content, image, status }) {
        try {
            // Kiểm tra validation
            if (!title || !description || !content || !image || !status) {
                return { success: false, status: 400, message: 'Missing required parameters' };
            }

            // Kiểm tra xem có bài đăng nào đã tồn tại với tiêu đề này chưa
            const duplicate = await Blog.findOne({ title });
            if (duplicate) {
                return { success: false, status: 400, message: 'Blog already exists' };
            }

            // Tạo slug từ tiêu đề blog
            const blogSlug = slugify(title, { lower: true });

            // Tạo mới một đối tượng Blog với thông tin được cung cấp
            const newBlog = new Blog({ title, description, content, image, status, blogSlug });

            // Lưu đối tượng Blog vào cơ sở dữ liệu
            await newBlog.save();

            return { success: true, message: 'Blog created successfully' };
        } catch (error) {
            return { success: false, status: 500, message: 'Internal Server Error', error };
        }
    }

    static async updateBlogService({ blogId, title, description, content, image, status }) {
        try {
            // Kiểm tra validation
            if (!blogId) {
                return { success: false, status: 400, message: 'Missing blogId parameter' };
            }

            // Kiểm tra xem bài đăng cần cập nhật có tồn tại không
            const existingBlog = await Blog.findById(blogId);
            if (!existingBlog) {
                return { success: false, status: 404, message: 'Blog not found' };
            }

            // Kiểm tra xem có bài đăng khác có tiêu đề giống nhau không
            if (title && title !== existingBlog.title) {
                const duplicateTitle = await Blog.findOne({ title });
                if (duplicateTitle) {
                    return { success: false, status: 400, message: 'Another blog with the same title already exists' };
                }
            }

            // Cập nhật thông tin của bài đăng
            existingBlog.title = title || existing
            existingBlog.description = description || existingBlog.description;
            existingBlog.content = content || existingBlog.content;
            existingBlog.image = image || existingBlog.image;
            existingBlog.status = status || existingBlog.status;

            // Lưu thay đổi vào cơ sở dữ liệu
            await existingBlog.save();

            return { success: true, message: 'Blog updated successfully' };
        } catch (error) {
            return { success: false, status: 500, message: 'Internal Server Error', error };
        }
    }

    static async deleteBlogByIdService(blogId) {
        try {
            // Kiểm tra validation
            if (!blogId) {
                return { success: false, status: 400, message: 'Missing blogId parameter' };
            }

            // Kiểm tra xem bài đăng cần xóa có tồn tại hay không
            const existingBlog = await Blog.findById(blogId);
            if (!existingBlog) {
                return { success: false, status: 404, message: 'Blog not found' };
            }

            // Xóa bài đăng từ cơ sở dữ liệu
            await existingBlog.remove();

            return { success: true, message: 'Blog deleted successfully' };
        } catch (error) {
            return { success: false, status: 500, message: 'Internal Server Error', error };
        }
    }
}

module.exports = BlogService;