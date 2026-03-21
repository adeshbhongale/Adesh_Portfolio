import { aboutData, blogData, educationData, experiencesData, projectsData, skillsInfo } from "@/lib/data";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Project from "@/models/Project";
import SiteContent from "@/models/SiteContent";

/**
 * Seed script to populate MongoDB with portfolio data
 * Run with: npx ts-node scripts/seed-data.ts
 * Or add to package.json scripts: "seed": "ts-node scripts/seed-data.ts"
 */

async function seedProjects() {
    try {
        console.log("🌱 Seeding Projects...");

        let processedCount = 0;

        for (const project of projectsData) {
            const { id, webapp, tags, showButtons, ...projectData } = project;

            // Map webapp to live field for MongoDB model
            const mongoProject = {
                ...projectData,
                live: webapp
            };

            await Project.findOneAndUpdate(
                { title: project.title },
                mongoProject,
                { upsert: true, new: true }
            );

            processedCount++;
        }

        console.log(`✅ Successfully processed ${processedCount} projects (created or updated)`);
    } catch (error) {
        console.error("❌ Error seeding projects:", error);
        throw error;
    }
}

async function seedBlogs() {
    try {
        console.log("🌱 Seeding Blogs...");

        let processedCount = 0;

        for (const blog of blogData) {
            await Blog.findOneAndUpdate(
                { slug: blog.slug },
                blog,
                { upsert: true, new: true }
            );

            processedCount++;
        }

        console.log(`✅ Successfully processed ${processedCount} blogs (created or updated)`);
    } catch (error) {
        console.error("❌ Error seeding blogs:", error);
        throw error;
    }
}

async function seedSiteContent() {
    try {
        console.log("🌱 Seeding Site Content...");

        const siteContent = {
            about: aboutData,
            experiences: experiencesData,
            education: educationData,
            skills: skillsInfo
        };

        const result = await SiteContent.findOneAndUpdate(
            {},
            siteContent,
            { upsert: true, new: true }
        );

        console.log(`✅ Successfully seeded site content`);
    } catch (error) {
        console.error("❌ Error seeding site content:", error);
        throw error;
    }
}

async function main() {
    try {
        console.log("📦 Starting database seed...\n");

        // Connect to MongoDB
        await connectDB();
        console.log("✅ Connected to MongoDB\n");

        // Seed all data
        await seedProjects();
        await seedBlogs();
        await seedSiteContent();

        console.log("\n🎉 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("\n💥 Seeding failed:", error);
        process.exit(1);
    }
}

main();
