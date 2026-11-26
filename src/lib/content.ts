import { blogPosts as sampleBlogPosts, caseStudies as sampleCaseStudies } from "@/data/sample-content";
import type { BlogPost, CaseStudy, ContentSection } from "@/data/sample-content";
import { getContactDatabase } from "@/lib/firebase-admin";

function readString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function readLocalImage(value: unknown) {
  return typeof value === "string" && /^\/images\/[\w.-]+$/.test(value)
    ? value
    : undefined;
}

function readSections(value: unknown): ContentSection[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((section): ContentSection[] => {
    if (!section || typeof section !== "object") return [];
    const record = section as Record<string, unknown>;
    if (typeof record.heading !== "string" || typeof record.body !== "string") {
      return [];
    }
    return [{ heading: record.heading, body: record.body }];
  });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const database = getContactDatabase();
    if (!database) return sampleBlogPosts;
    const snapshot = await database
      .collection("posts")
      .where("published", "==", true)
      .get();
    if (snapshot.empty) return sampleBlogPosts;

    return snapshot.docs
      .map((document) => {
        const data = document.data();
        return {
          slug: readString(data.slug, document.id),
          title: readString(data.title, "Untitled article"),
          excerpt: readString(data.excerpt, ""),
          category: readString(data.category, "Insights"),
          date: readString(data.date, new Date().toISOString().slice(0, 10)),
          readTime: readString(data.readTime, "5 min read"),
          coverStyle: readString(
            data.coverStyle,
            "from-[#102b56] via-[#2761a8] to-[#a4c7f5]",
          ),
          coverImage: readLocalImage(data.coverImage) ?? "/images/digital-studio.jpg",
          coverImageAlt: readString(
            data.coverImageAlt,
            "Illustrative stock photography accompanying this article.",
          ),
          sections: readSections(data.sections),
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Could not load journal content from Firestore; using samples:", error);
    return sampleBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const database = getContactDatabase();
    if (!database) return sampleCaseStudies;
    const snapshot = await database
      .collection("caseStudies")
      .where("published", "==", true)
      .get();
    if (snapshot.empty) return sampleCaseStudies;

    return snapshot.docs.map((document) => {
      const data = document.data();
      const services = Array.isArray(data.services)
        ? data.services.filter((service): service is string => typeof service === "string")
        : [];
      return {
        slug: readString(data.slug, document.id),
        title: readString(data.title, "Untitled case study"),
        excerpt: readString(data.excerpt, ""),
        category: readString(data.category, "Creative"),
        isSample: data.isSample === true,
        client: readString(data.client, "Client project"),
        industry: readString(data.industry, "Digital"),
        services,
        result: readString(data.result, "A thoughtful digital experience"),
        coverStyle: readString(
          data.coverStyle,
          "from-[#102b56] via-[#2761a8] to-[#a4c7f5]",
        ),
        coverImage: readLocalImage(data.coverImage) ?? "/images/digital-studio.jpg",
        coverImageAlt: readString(
          data.coverImageAlt,
          "Illustrative stock photography accompanying this concept.",
        ),
        sections: readSections(data.sections),
      };
    });
  } catch (error) {
    console.error("Could not load case studies from Firestore; using samples:", error);
    return sampleCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const studies = await getCaseStudies();
  return studies.find((study) => study.slug === slug);
}
