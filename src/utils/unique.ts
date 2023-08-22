import { Reference, ReferenceFilterResolverContext, ReferenceFilterSearchOptions } from 'sanity';

export function filterUnique(context: ReferenceFilterResolverContext): ReferenceFilterSearchOptions | Promise<ReferenceFilterSearchOptions> {
  const [token] = context.parentPath;
  const referencies = (context.document[String(token)] || []) as Array<Reference>;
  const existing = referencies.map((ref) => ref._ref).filter(Boolean);
  return {
    filter: '!(_id in $existing)',
    params: {
      existing
    }
  }
}