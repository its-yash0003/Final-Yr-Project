import React from 'react';

const articles = [
  {
    title: "10 Simple Habits to Boost Mental Health",
    description:
      "Discover everyday habits that can help you stay mentally resilient, like mindful breathing, sleep hygiene, and journaling.",
    link: "https://www.healthline.com/health/mental-health-tips",
    author: "Healthline",
  },
  {
    title: "Understanding Anxiety and How to Cope",
    description:
      "Explore causes, symptoms, and practical ways to manage anxiety through cognitive techniques and support.",
    link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
    author: "National Institute of Mental Health",
  },
  {
    title: "Meditation and Mindfulness for Beginners",
    description:
      "Learn how to practice mindfulness meditation and why it’s so effective for emotional regulation and mental clarity.",
    link: "https://www.headspace.com/mindfulness",
    author: "Headspace",
  },
  {
    title: "The Importance of Social Connection",
    description:
      "Social well-being plays a vital role in mental health. Read how meaningful relationships reduce stress and promote longevity.",
    link: "https://www.apa.org/news/press/releases/stress/2017/technology-social-media",
    author: "APA (American Psychological Association)",
  },
  {
    title: "Signs of Burnout and How to Recover",
    description:
      "Feeling constantly drained? Learn to identify burnout symptoms and restore balance in your life.",
    link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/burnout/",
    author: "Mind UK",
  },
];

const MentalHealthArticles = () => {
  return (
    <div className="bg-white min-h-screen mt-24 pb-12 px-4 sm:px-6 lg:px-20">
      {/* mt-16 pushes it below fixed navbar (64px tall) */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🧠 Mental Health & Well-being Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">By {article.author}</span>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthArticles;
