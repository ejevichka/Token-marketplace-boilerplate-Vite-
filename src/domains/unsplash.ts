import * as z from "zod";
import { createApi, type SearchOrderBy, type ColorId } from 'unsplash-js';

// Lazy initialization for the Unsplash API instance
let cachedUnsplashApi: ReturnType<typeof createApi> | null = null;

function getUnsplashApi() {
  if (!cachedUnsplashApi) {
    cachedUnsplashApi = createApi({
      accessKey: import.meta.env.VITE_UNSPLASH_API,
    });
  }
  return cachedUnsplashApi;
}
const unsplashImageSchema = z.object({
  id: z.string(),
  color: z.string().optional(),
  width: z.number(),
  height: z.number(),
  description: z.union([z.string(), z.null()]).optional(),
  urls: z.object({
    regular: z.string(),
    thumb: z.string(),
    small: z.string(),
  }),
});

export type UnsplashImage = z.infer<typeof unsplashImageSchema>;

export type UnsplashSearchFilter = {
  page: number;
  query: string;
  orderBy: SearchOrderBy;
  color: ColorId | undefined;
};

function unsplashResponseSchema<T extends z.ZodSchema>(entitySchema: T) {
  return z.object({
    results: z.array(entitySchema),
    total: z.number(),
    total_pages: z.number(),
  });
}

const unsplashSearchResponse = unsplashResponseSchema(unsplashImageSchema);

export class UnsplashApi {
  private totalPages: number = 0;

  search = async (filter: UnsplashSearchFilter): Promise<UnsplashImage[]> => {
    if (!filter.query) return [];
    const unsplash = getUnsplashApi(); 
    const response = await unsplash.search.getPhotos({ query: filter.query, page: filter.page, perPage: 8, orderBy: filter.orderBy, color: filter.color });
    const parsed = unsplashSearchResponse.parse(response.response);
    this.totalPages = parsed.total_pages;
    return parsed.results
      .map((x) => unsplashImageSchema.safeParse(x).data)
      .filter((x) => Boolean(x)) as UnsplashImage[];
  };

  getTotalNumber = (): number => {
    return this.totalPages;
  };

}

export const unsplashApi = new UnsplashApi();
