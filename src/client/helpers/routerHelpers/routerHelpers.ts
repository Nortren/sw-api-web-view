export default function usePathHistory(pathname: string) {
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');
  const currentPageIndex = pathSegments.length - 1;
  const previousPage = pathSegments[currentPageIndex - 1] || null;
  return {
    current: pathSegments[currentPageIndex],
    previous: previousPage,
  };
}
