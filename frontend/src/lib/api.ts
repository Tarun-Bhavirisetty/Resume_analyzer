const API_URL = "http://127.0.0.1:8000/api";

export async function uploadResume(file: File) {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("user_id", "demo-user");

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.detail || "Failed to upload resume"
      );
    }

    return await response.json();

  } catch (error: any) {
    console.error("Upload Resume Error:", error);

    throw new Error(
      error.message || "Something went wrong while uploading"
    );
  }
}

export async function analyzeResume(
  resumeId: number,
  targetRole: string,
  manualSkills: string = ""
) {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        resume_id: resumeId,
        target_role: targetRole,
        manual_skills: manualSkills,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.detail || "Failed to analyze resume"
      );
    }

    return await response.json();

  } catch (error: any) {
    console.error("Analyze Resume Error:", error);

    throw new Error(
      error.message || "Something went wrong during analysis"
    );
  }
}