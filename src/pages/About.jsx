import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-green-200 to-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-800 dark:to-black min-h-screen py-12 px-6">
      
      {/* About the Project */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transition-colors duration-500 mb-20">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-800 dark:text-blue-400 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-300">
        About <span className="text-blue-500 dark:text-blue-300">Mindful Journal</span>
      </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Mindful Journal is a comprehensive journaling and mental wellness app designed to support users in their journey
          toward emotional well-being and self-improvement. With intuitive journaling features, calming design elements, 
          and a focus on mindfulness, Mindful Journal offers a dedicated space for individuals to reflect, express, and grow.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          In today’s fast-paced world, mental health has become increasingly important, and Mindful Journal aims to create 
          a space for individuals to track their emotions, express their thoughts, and cultivate mindfulness. With daily prompts,
          mood tracking, and various journaling features, it is designed to empower individuals to better understand themselves 
          and lead happier, more balanced lives.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Whether you are seeking clarity in your thoughts, building a habit of self-reflection, or exploring ways to manage
          stress and anxiety, Mindful Journal provides an all-in-one solution to help you on your journey of self-discovery.
        </p>
        <div className="flex justify-center mb-8">
          <img
            src="https://images.pexels.com/photos/2388936/pexels-photo-2388936.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Mindful Journal App"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/208147/pexels-photo-208147.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Mood Tracking"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Mood Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your emotions every day with our mood tracker, helping you gain insight into your mental health journey.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5756564/pexels-photo-5756564.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Daily Prompts"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Daily Prompts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive daily guided prompts to inspire your journaling and encourage self-reflection, helping you develop a deeper connection with yourself.
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/8251487/pexels-photo-8251487.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Personalized Themes"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Personalized Themes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from a variety of themes to customize your journaling space and make it as unique as you are.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Reflective Analytics"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Reflective Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visualize your emotional growth with data-driven insights and trends to track your progress over time.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Private Journaling"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Private Journaling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep your thoughts and reflections completely private, ensuring a safe space for your most personal entries.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2277923/pexels-photo-2277923.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Reminders"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay on track with gentle reminders to journal and reflect, ensuring you make self-care a daily habit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goals */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
          Our Vision, Mission & Goals
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Vision</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          At Mindful Journal, our vision is to create a supportive and inclusive space where individuals can reflect, express, and grow.
          We believe that through the power of journaling, mindfulness, and self-reflection, individuals can build emotional resilience
          and lead happier, more fulfilling lives.
        </p>
        
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Our mission is to inspire personal growth and mental well-being through journaling. We aim to provide users with a powerful tool
          to track their emotions, gain insight into their mental state, and promote mindfulness. By offering personalized features and
          accessible tools, we hope to empower users on their journey of self-discovery.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Goals</h3>
        <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
          <li>To foster a positive, reflective, and safe space for all users to explore their thoughts.</li>
          <li>To provide powerful tools for emotional tracking, personal growth, and self-improvement.</li>
          <li>To create a community where users can connect, share experiences, and support each other's journey.</li>
          <li>To continuously innovate and improve features to meet the needs of our diverse user base.</li>
        </ul>
        
        <div className="flex justify-center mt-8">
          <img
            src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Mindful Journal Community"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* Benefits of Journaling & Mindfulness */}
<section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
  <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
    Benefits of Journaling & Mindfulness
  </h2>

  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
    <p>
      Journaling is a scientifically-backed habit that helps individuals process emotions, clarify thoughts, and manage mental health. When combined with mindfulness, it becomes a powerful tool for emotional awareness and healing.
    </p>
    
    <ul className="list-disc list-inside pl-4 space-y-3">
      <li><strong>Reduces stress and anxiety:</strong> Writing down your thoughts helps offload emotional tension and bring mental clarity.</li>
      <li><strong>Boosts self-awareness:</strong> Daily reflection encourages understanding of patterns in mood, triggers, and responses.</li>
      <li><strong>Improves emotional regulation:</strong> Tracking emotions enables better management of highs and lows.</li>
      <li><strong>Strengthens memory and cognitive function:</strong> The act of journaling enhances mental clarity and focus.</li>
      <li><strong>Encourages gratitude and positivity:</strong> Prompts and gratitude logs help reframe your mindset toward the good.</li>
    </ul>

    <p>
      Mindful Journal is designed to make these benefits accessible, engaging, and sustainable for everyone — whether you're just starting or continuing your wellness journey.
    </p>
  </div>

  <div className="flex justify-center mt-8">
    <img
      src="https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Mindful Benefits"
      className="rounded-xl shadow-lg w-full max-w-md"
    />
  </div>
</section>

 {/* Timeline / Flowchart Section */}
 <section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Your Daily Flow with Mindful Journal
        </h2>
        <div className="space-y-6">
          {[
            { step: "🧘‍♀️ Morning Check-in", desc: "Start your day with a quick emotion check-in and intention setting." },
            { step: "📝 Midday Reflection", desc: "Take a pause and reflect on your thoughts and focus." },
            { step: "🌇 Evening Journaling", desc: "Write about your day, track your mood, and express your thoughts." },
            { step: "📈 Analyze & Improve", desc: "Review past entries to spot emotional patterns and personal growth." },
          ].map(({ step, desc }, i) => (
            <div key={i} className="flex items-start gap-4 border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all">
              <div className="text-2xl">{step.split(" ")[0]}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{step}</h3>
                <p className="text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
