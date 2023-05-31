import ExhibitionManager from "./exhibition-manager";
import ArticleManager from "./article-manager";
const ContentManager = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 mt-10">Content Manager</h1>
            <div className="p-4">
                <ExhibitionManager />
                <ArticleManager />
            </div>
        </div>
    );
};

export default ContentManager;