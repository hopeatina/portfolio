import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/data/blog");

interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

type PostDataPartial = Omit<PostData, 'content'>;

export function getAllPosts(): PostDataPartial[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error("Blog directory does not exist:", postsDirectory);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName): PostDataPartial | null => {
        try {
          const slug = fileName.replace(/\.md$/, "");
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data } = matter(fileContents);

          // Validate required fields
          if (!data.title || !data.date) {
            console.error(`Missing required fields in ${fileName}`);
            return null;
          }

          return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt || "",
            category: data.category || "Uncategorized",
          };
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is PostDataPartial => post !== null)
      .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

    return posts;
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): PostData {
  try {
    if (!slug) {
      throw new Error("Slug is required");
    }

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.date) {
      throw new Error(`Missing required fields in ${slug}.md`);
    }

    // Ensure content is always a string
    const processedContent = content || "";

    return {
      slug,
      title: data.title,
      date: data.date,
      content: processedContent,
      excerpt: data.excerpt || "",
      category: data.category || "Uncategorized",
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    throw error;
  }
} 