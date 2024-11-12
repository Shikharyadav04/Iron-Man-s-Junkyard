import ReactTypingEffect from "react-typing-effect";

function TypingEffect() {
  return (
    <ReactTypingEffect
      text={[
        "Hello, I'm Atul Pathak.",
        "I'm passionate about learning new technologies.",
        "Welcome to my portfolio!",
      ]}
      speed={50}
      eraseSpeed={25}
      typingDelay={100}
    />
  );
}

export default TypingEffect;
