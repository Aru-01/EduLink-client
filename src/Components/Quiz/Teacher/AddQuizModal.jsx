import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxios/useAxiosPublic";

const AddQuizModal = ({ user, onClose, onSubmit }) => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    teacher_name: user.displayName,
    teacher_email: user.email,
    sub_name: "",
    sub_code: "",
    total_marks: "",
    total_time: "",
    questions: [],
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          question: "",
          options: { a: "", b: "", c: "", d: "" },
          correct_ans: "",
          response_time: "",
        },
      ],
    });
  };
  const removeQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  const validateCorrectAns = (question, index) => {
    const options = Object.values(question.options).filter(Boolean);
    if (!options.includes(question.correct_ans)) {
      setError(`questions.${index}.correct_ans`, {
        type: "validate",
        message: "Correct answer must match one of the options.",
      });
      return false;
    }
    clearErrors(`questions.${index}.correct_ans`);
    return true;
  };

  const onSubmitHandler = async (data) => {
    let isValid = true;
    data.teacher_name = quizData.teacher_name;
    data.teacher_email = quizData.teacher_email;
    data.questions.forEach((question, index) => {
      if (!validateCorrectAns(question, index)) isValid = false;
    });
    if (!isValid) return;

    // console.log("Quiz Data Submitted: ", data);
    const itemRes = await axiosPublic.post("/quizes", data);
    if (itemRes.data.insertedId) {
      console.log("success");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center w-full">
            {step === 1 ? "Add Quiz Details" : "Add Questions"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-2xl hover:text-black focus:outline-none"
          >
            &times;
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
            <div>
              <label className="font-semibold">Subject Name</label>
              <input
                type="text"
                {...register("sub_name", {
                  required: "Subject name is required",
                })}
                className={`w-full p-3 border rounded focus:outline-none ${
                  errors.sub_name
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.sub_name && (
                <p className="text-red-500 text-sm">
                  {errors.sub_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold">Subject Code</label>
              <input
                type="text"
                {...register("sub_code", {
                  required: "Subject code is required",
                })}
                className={`w-full p-3 border rounded focus:outline-none ${
                  errors.sub_code
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.sub_code && (
                <p className="text-red-500 text-sm">
                  {errors.sub_code.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold">Total Marks</label>
              <input
                type="number"
                {...register("total_marks", {
                  required: "Total marks is required",
                })}
                className={`w-full p-3 border rounded focus:outline-none ${
                  errors.total_marks
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.total_marks && (
                <p className="text-red-500 text-sm">
                  {errors.total_marks.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold">Total Time (in minutes)</label>
              <input
                type="text"
                {...register("total_time", {
                  required: "Total time is required",
                })}
                className={`w-full p-3 border rounded focus:outline-none ${
                  errors.total_time
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.total_time && (
                <p className="text-red-500 text-sm">
                  {errors.total_time.message}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            {quizData.questions.map((question, index) => (
              <div
                key={index}
                className="space-y-2 border p-4 rounded shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <label className="font-semibold">Question {index + 1}</label>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <Controller
                    name={`questions.${index}.question`}
                    control={control}
                    rules={{ required: "Question is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`w-full p-3 border rounded focus:outline-none ${
                          errors?.questions?.[index]?.question
                            ? "border-red-500"
                            : "focus:ring-2 focus:ring-blue-500"
                        }`}
                      />
                    )}
                  />
                  {errors?.questions?.[index]?.question && (
                    <p className="text-red-500 text-sm">
                      {errors.questions[index].question.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["a", "b", "c", "d"].map((opt) => (
                    <div key={opt}>
                      <label className="font-semibold">
                        Option {opt.toUpperCase()}
                      </label>
                      <Controller
                        name={`questions.${index}.options.${opt}`}
                        control={control}
                        rules={{
                          required: `Option ${opt.toUpperCase()} is required`,
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            className={`w-full p-3 border rounded focus:outline-none ${
                              errors?.questions?.[index]?.options?.[opt]
                                ? "border-red-500"
                                : "focus:ring-2 focus:ring-blue-500"
                            }`}
                          />
                        )}
                      />
                      {errors?.questions?.[index]?.options?.[opt] && (
                        <p className="text-red-500 text-sm">
                          {errors.questions[index].options[opt].message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <label className="font-semibold">Correct Answer</label>
                    <Controller
                      name={`questions.${index}.correct_ans`}
                      control={control}
                      rules={{ required: "Correct answer is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className={`w-full p-3 border rounded focus:outline-none ${
                            errors?.questions?.[index]?.correct_ans
                              ? "border-red-500"
                              : "focus:ring-2 focus:ring-blue-500"
                          }`}
                        />
                      )}
                    />
                    {errors?.questions?.[index]?.correct_ans && (
                      <p className="text-red-500 text-sm">
                        {errors.questions[index].correct_ans.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold">
                      Response Time (in seconds)
                    </label>
                    <Controller
                      name={`questions.${index}.response_time`}
                      control={control}
                      rules={{
                        required: "Response time is required",
                        validate: (value) =>
                          value > 0
                            ? true
                            : "Response time must be greater than 0",
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className={`w-full p-3 border rounded focus:outline-none ${
                            errors?.questions?.[index]?.response_time
                              ? "border-red-500"
                              : "focus:ring-2 focus:ring-blue-500"
                          }`}
                        />
                      )}
                    />
                    {errors?.questions?.[index]?.response_time && (
                      <p className="text-red-500 text-sm">
                        {errors.questions[index].response_time.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Add Question
            </button>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-600 text-white py-2 px-4 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Submit Quiz
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddQuizModal;
