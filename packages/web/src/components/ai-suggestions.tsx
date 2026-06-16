          {/* AI Analysis Results */}
          {isAnalyzing || analysisProgress > 0 ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Search className="h-4 w-4 mt-1 text-indigo-500 dark:text-indigo-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100">AI Video Analysis</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Detecting highlights and key moments
                  </p>
                </div>
              </div>